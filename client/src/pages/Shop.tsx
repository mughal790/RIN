import { useProducts, useCategories } from "@/hooks/use-shop";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const { data: products, isLoading } = useProducts({ category: activeCategory });
  const { data: categories } = useCategories();
  
  return (
    <div className="min-h-screen pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-medium mb-4">Shop</h1>
          <p className="text-muted-foreground">Explore our complete collection of premium goods.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory(undefined)}
            className={`px-4 py-2 text-sm rounded-full transition-all ${
              activeCategory === undefined 
                ? "bg-foreground text-background" 
                : "bg-secondary hover:bg-secondary/80 text-foreground"
            }`}
          >
            All
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.slug)}
              className={`px-4 py-2 text-sm rounded-full transition-all ${
                activeCategory === cat.slug
                  ? "bg-foreground text-background"
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No products found in this category.</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12"
          >
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
