import { db } from "./db";
import {
  categories,
  products,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct
} from "@shared/schema";
import { eq, ilike } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  getProducts(params?: { categorySlug?: string; featured?: boolean; search?: string }): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getProducts(params?: { categorySlug?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    let query = db.select().from(products);
    
    // Join would be better but keeping it simple for now or adding relations later
    // For now, filtering in memory if we need category slug -> id mapping, 
    // BUT efficient way is to fetch category first if slug provided.
    
    if (params?.categorySlug) {
       const category = await this.getCategoryBySlug(params.categorySlug);
       if (category) {
         query = db.select().from(products).where(eq(products.categoryId, category.id)) as any;
       } else {
         return [];
       }
    }

    if (params?.featured) {
       // Note: This logic overwrites previous where if strictly chained without 'and'. 
       // Drizzle query builder is immutable-ish, better to use array of conditions
       // But for simple implementation:
       const conditions = [];
       if (params.categorySlug) {
         const category = await this.getCategoryBySlug(params.categorySlug);
         if (category) conditions.push(eq(products.categoryId, category.id));
         else return [];
       }
       if (params.featured) conditions.push(eq(products.isFeatured, true));
       
       if (params.search) {
         conditions.push(ilike(products.name, `%${params.search}%`));
       }

       if (conditions.length > 0) {
         // This is a simplified way to apply all AND conditions
         // Correct drizzle usage involves `and(...)`
         const { and } = await import("drizzle-orm");
         return await db.select().from(products).where(and(...conditions));
       }
    }
    
    return await db.select().from(products);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
