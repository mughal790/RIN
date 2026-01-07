import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.categories.list.path, async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get(api.categories.get.path, async (req, res) => {
    const category = await storage.getCategoryBySlug(req.params.slug);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  });

  app.get(api.products.list.path, async (req, res) => {
    // Manual parsing of query params since express query is string
    const featured = req.query.featured === 'true';
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    
    const products = await storage.getProducts({ featured, categorySlug: category, search });
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // Seed Data Endpoint (Internal use or auto-run)
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const categories = await storage.getCategories();
  if (categories.length === 0) {
    const men = await storage.createCategory({
      name: "Men's Collection",
      slug: "men",
      imageUrl: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?q=80&w=2071&auto=format&fit=crop",
      description: "Timeless essentials for the modern man."
    });
    
    const women = await storage.createCategory({
      name: "Women's Collection",
      slug: "women",
      imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
      description: "Elegant designs for every occasion."
    });

    const accessories = await storage.createCategory({
      name: "Accessories",
      slug: "accessories",
      imageUrl: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop",
      description: "The finishing touches."
    });

    await storage.createProduct({
      categoryId: men.id,
      name: "The Classic Oxford",
      slug: "classic-oxford-shirt",
      description: "A staple in every wardrobe. Crafted from premium Italian cotton with a perfect tailored fit.",
      price: "120.00",
      images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop"],
      isFeatured: true,
      specifications: { "Material": "100% Cotton", "Fit": "Tailored", "Care": "Machine Wash" },
      stock: 50
    });

    await storage.createProduct({
      categoryId: men.id,
      name: "Merino Wool Sweater",
      slug: "merino-wool-sweater",
      description: "Ultra-soft merino wool sweater perfect for layering.",
      price: "185.00",
      images: ["https://images.unsplash.com/photo-1610652492500-ded49ceeb378?q=80&w=1974&auto=format&fit=crop"],
      isFeatured: false,
      specifications: { "Material": "100% Merino Wool", "Fit": "Regular", "Origin": "Italy" },
      stock: 30
    });

    await storage.createProduct({
      categoryId: women.id,
      name: "Silk Evening Dress",
      slug: "silk-evening-dress",
      description: "Flowing silk silhouette that captures elegance and grace.",
      price: "450.00",
      images: ["https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"],
      isFeatured: true,
      specifications: { "Material": "100% Silk", "Fit": "Relaxed", "Care": "Dry Clean Only" },
      stock: 15
    });

    await storage.createProduct({
      categoryId: accessories.id,
      name: "Minimalist Leather Watch",
      slug: "leather-watch",
      description: "A timeless timepiece with a genuine leather strap and minimal dial.",
      price: "220.00",
      images: ["https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1976&auto=format&fit=crop"],
      isFeatured: true,
      specifications: { "Movement": "Quartz", "Strap": "Genuine Leather", "Water Resistant": "3ATM" },
      stock: 100
    });
  }
}
