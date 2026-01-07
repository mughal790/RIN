import { db } from "./db";
import {
  categories,
  products,
  type Category,
  type InsertCategory,
  type Product,
  type InsertProduct
} from "@shared/schema";
import { eq, ilike, and } from "drizzle-orm";

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
    try {
      return await db.select().from(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    try {
      const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
      return category;
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      return undefined;
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db.insert(categories).values(category).returning();
    return newCategory;
  }

  async getProducts(params?: { categorySlug?: string; featured?: boolean; search?: string }): Promise<Product[]> {
    try {
      const conditions = [];
      
      if (params?.categorySlug) {
        const category = await this.getCategoryBySlug(params.categorySlug);
        if (category) {
          conditions.push(eq(products.categoryId, category.id));
        } else {
          return [];
        }
      }

      if (params?.featured) {
        conditions.push(eq(products.isFeatured, true));
      }

      if (params?.search) {
        conditions.push(ilike(products.name, `%${params.search}%`));
      }

      let query = db.select().from(products);
      if (conditions.length > 0) {
        return await query.where(and(...conditions));
      }
      return await query;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const [product] = await db.select().from(products).where(eq(products.slug, slug));
      return product;
    } catch (error) {
      console.error(`Error fetching product ${slug}:`, error);
      return undefined;
    }
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db.insert(products).values(product).returning();
    return newProduct;
  }
}

export const storage = new DatabaseStorage();
