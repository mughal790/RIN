import { useProduct } from "@/hooks/use-shop";
import { useCart } from "@/hooks/use-cart";
import { useRoute, Link } from "wouter";
import { useState } from "react";
import { Loader2, Minus, Plus, ChevronRight, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const slug = params?.slug;
  const { data: product, isLoading, error } = useProduct(slug || "");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "shipping">("details");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-serif">Product Not Found</h1>
        <Link href="/shop" className="text-sm underline underline-offset-4">Return to Shop</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-muted-foreground mb-8 gap-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <ChevronRight size={14} />
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight size={14} />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-secondary overflow-hidden w-full">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {product.images.slice(1).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-secondary overflow-hidden">
                    <img src={img} alt={`${product.name} ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="sticky top-32 self-start space-y-8">
            <div className="space-y-4 border-b border-border pb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-medium">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-light">${parseFloat(product.price).toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${parseFloat(product.originalPrice).toFixed(2)}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-6">
              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium w-20">Quantity</span>
                <div className="flex items-center border border-border rounded-sm">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-mono">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-secondary transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide hover:bg-primary/90 transition-all active:scale-[0.98]"
              >
                ADD TO CART
              </button>

              {/* Value Props */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} /> Free Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} /> 30-Day Returns
                </div>
              </div>
            </div>

            {/* Tabs / Accordion */}
            <div className="pt-8">
              <div className="flex border-b border-border mb-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`pb-4 text-sm font-medium tracking-wide mr-8 transition-colors ${
                    activeTab === "details" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  SPECIFICATIONS
                </button>
                <button
                  onClick={() => setActiveTab("shipping")}
                  className={`pb-4 text-sm font-medium tracking-wide transition-colors ${
                    activeTab === "shipping" ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  SHIPPING & RETURNS
                </button>
              </div>

              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "details" ? (
                  <div className="space-y-2">
                    {product.specifications ? (
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="grid grid-cols-3 gap-4 text-sm py-2 border-b border-border/50 last:border-0">
                          <span className="font-medium text-foreground capitalize">{key.replace(/_/g, " ")}</span>
                          <span className="col-span-2 text-muted-foreground">{value as string}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No specifications available.</p>
                    )}
                  </div>
                ) : (
                  <div className="text-sm text-muted-foreground space-y-4">
                    <p>Free shipping on all orders over $100. All orders are processed within 1-2 business days.</p>
                    <p>We accept returns within 30 days of purchase. Items must be in their original condition.</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
