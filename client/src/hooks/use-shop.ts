import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";
import type { Category, Product } from "@shared/schema";

// Type definitions matching backend exactly
type CategoryResponse = Category;
type ProductResponse = Product;

// List Categories
export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}

// Get Single Category
export function useCategory(slug: string) {
  return useQuery({
    queryKey: [api.categories.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.categories.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch category");
      return api.categories.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// List Products (with optional filtering)
export function useProducts(filters?: { category?: string; featured?: boolean; search?: string }) {
  return useQuery({
    queryKey: [api.products.list.path, filters],
    queryFn: async () => {
      const url = new URL(api.products.list.path, window.location.origin);
      if (filters?.category) url.searchParams.set("category", filters.category);
      if (filters?.featured !== undefined) url.searchParams.set("featured", String(filters.featured));
      if (filters?.search) url.searchParams.set("search", filters.search);

      const res = await fetch(url.toString(), { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// Get Single Product
export function useProduct(slug: string) {
  return useQuery({
    queryKey: [api.products.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}
