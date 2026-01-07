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
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.categories.get.path, async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.products.list.path, async (req, res) => {
    try {
      const featured = req.query.featured === 'true';
      const category = req.query.category as string | undefined;
      const search = req.query.search as string | undefined;
      
      const products = await storage.getProducts({ featured, categorySlug: category, search });
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.products.get.path, async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Re-seed for image fixes if requested
  if (process.env.RESEED === "true") {
    await seedDatabase();
  }

  if (process.env.NODE_ENV !== "production") {
    await seedDatabase();
  }

  return httpServer;
}

async function seedDatabase() {
  const categoriesList = await storage.getCategories();
  if (categoriesList.length === 0) {
    const watches = await storage.createCategory({
      name: "Luxury Watches",
      slug: "watches",
      imageUrl: "/1.jpg",
      description: "Exquisite timepieces for the discerning individual."
    });
    
    const clothes = await storage.createCategory({
      name: "Premium Clothing",
      slug: "clothes",
      imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
      description: "Luxurious fabrics and impeccable tailoring."
    });

    const shoes = await storage.createCategory({
      name: "Designer Shoes",
      slug: "shoes",
      imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
      description: "Step into sophistication with our exclusive footwear."
    });

    const goggles = await storage.createCategory({
      name: "Eyewear",
      slug: "goggles",
      imageUrl: "https://images.unsplash.com/photo-1511499767390-90342f5b89a8?q=80&w=2080&auto=format&fit=crop",
      description: "Iconic eyewear designed for style and clarity."
    });

    const socks = await storage.createCategory({
      name: "Socks & Intimates",
      slug: "socks",
      imageUrl: "https://images.unsplash.com/photo-1582966239102-93cc74a44cb5?q=80&w=1974&auto=format&fit=crop",
      description: "Premium comfort in every step."
    });

    // Seed Products
    await storage.createProduct({
      categoryId: watches.id,
      name: "Rin Chronograph Obsidian",
      slug: "rin-chronograph-obsidian",
      description: "A masterpiece of engineering featuring an obsidian dial and sapphire crystal.",
      price: "1250.00",
      images: ["/1.jpg"],
      isFeatured: true,
      specifications: { "Case": "42mm Titanium", "Movement": "Automatic", "Strap": "Alligator Leather" },
      stock: 5
    });

    await storage.createProduct({
      categoryId: watches.id,
      name: "Rin Heritage Silver",
      slug: "rin-heritage-silver",
      description: "Classic silver timepiece with a sunray dial and premium stainless steel bracelet.",
      price: "950.00",
      images: ["/2.jpg"],
      isFeatured: true,
      specifications: { "Case": "40mm Steel", "Movement": "Automatic", "Strap": "Steel Link" },
      stock: 8
    });

    await storage.createProduct({
      categoryId: watches.id,
      name: "Rin Midnight Gold",
      slug: "rin-midnight-gold",
      description: "Elegant gold-tone watch with a deep navy dial for a sophisticated look.",
      price: "1100.00",
      images: ["/3.jpg"],
      isFeatured: false,
      specifications: { "Case": "41mm Gold PVD", "Movement": "Automatic", "Strap": "Navy Leather" },
      stock: 10
    });

    await storage.createProduct({
      categoryId: watches.id,
      name: "Rin Rose Explorer",
      slug: "rin-rose-explorer",
      description: "A versatile watch combining rose gold accents with a rugged build.",
      price: "1050.00",
      images: ["/4.jpg"],
      isFeatured: false,
      specifications: { "Case": "42mm Rose Gold", "Movement": "Automatic", "Strap": "Rubber Hybrid" },
      stock: 15
    });

    await storage.createProduct({
      categoryId: watches.id,
      name: "Rin Minimalist White",
      slug: "rin-minimalist-white",
      description: "Clean, architectural design with a stark white dial and mesh strap.",
      price: "750.00",
      images: ["/5.jpg"],
      isFeatured: true,
      specifications: { "Case": "38mm Steel", "Movement": "Quartz", "Strap": "Mesh Steel" },
      stock: 25
    });

    await storage.createProduct({
      categoryId: clothes.id,
      name: "Cashmere Overcoat Bone",
      slug: "cashmere-overcoat-bone",
      description: "Luxurious pure cashmere overcoat in a stunning bone white finish.",
      price: "890.00",
      images: ["https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=1974&auto=format&fit=crop"],
      isFeatured: true,
      specifications: { "Material": "100% Cashmere", "Origin": "Inner Mongolia", "Fit": "Tailored" },
      stock: 12
    });

    await storage.createProduct({
      categoryId: shoes.id,
      name: "Ivory Leather Loafers",
      slug: "ivory-leather-loafers",
      description: "Hand-burnished ivory leather loafers with a signature brass bit.",
      price: "340.00",
      images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=2069&auto=format&fit=crop"],
      isFeatured: false,
      specifications: { "Leather": "Calfskin", "Sole": "Blake Stitched Leather", "Color": "Ivory" },
      stock: 20
    });

    await storage.createProduct({
      categoryId: goggles.id,
      name: "Aviation Silver Gradients",
      slug: "aviation-silver-gradients",
      description: "Classic aviator silhouette with silver-tone frames and gradient lenses.",
      price: "280.00",
      images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop"],
      isFeatured: true,
      specifications: { "Frame": "Surgical Steel", "Lens": "Polarized Gradient", "UVP": "100% UV400" },
      stock: 40
    });
  }
}
