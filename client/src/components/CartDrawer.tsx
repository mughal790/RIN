import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";

export function CartDrawer() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-2xl border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-serif font-medium flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Bag ({items.length})
              </h2>
              <button
                onClick={toggleCart}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center text-muted-foreground">
                    <ShoppingBag size={24} />
                  </div>
                  <p className="text-muted-foreground">Your shopping bag is empty</p>
                  <button
                    onClick={toggleCart}
                    className="text-sm font-medium underline underline-offset-4 hover:text-muted-foreground"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-24 bg-secondary overflow-hidden rounded-sm flex-shrink-0">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium line-clamp-1">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          ${parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-mono w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-border bg-secondary/20 space-y-4">
                <div className="flex justify-between items-center text-base font-medium">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button
                  className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-wide hover:bg-primary/90 transition-colors"
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
