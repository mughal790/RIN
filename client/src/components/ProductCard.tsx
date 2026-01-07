import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="aspect-[3/4] overflow-hidden bg-secondary relative">
        <Link href={`/product/${product.slug}`}>
          <div className="w-full h-full cursor-pointer">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Show second image on hover if available */}
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            )}
          </div>
        </Link>
        
        {/* Quick Add Button */}
        <button
          onClick={() => addItem(product)}
          className="absolute bottom-4 right-4 bg-background text-foreground p-3 rounded-full shadow-lg opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          aria-label="Add to cart"
        >
          <Plus size={20} />
        </button>
        
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
            Sale
          </div>
        )}
      </div>
      
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-foreground tracking-wide">
          <Link href={`/product/${product.slug}`} className="hover:underline underline-offset-4">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            ${parseFloat(product.price).toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-sm text-muted-foreground/50 line-through">
              ${parseFloat(product.originalPrice).toFixed(2)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
