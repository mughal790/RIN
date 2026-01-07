import { Link, useLocation } from "wouter";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import { motion, AnimatePresence } from "framer-motion";
import { useCategories } from "@/hooks/use-shop";

export function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const { data: categories } = useCategories();

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-md border-b border-border/40 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/shop" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                SHOP ALL
              </Link>
              <Link href="/collections" className="text-sm font-medium tracking-wide hover:text-muted-foreground transition-colors">
                COLLECTIONS
              </Link>
            </div>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 group cursor-pointer">
              <span className={`font-serif text-2xl md:text-3xl font-bold tracking-tight transition-colors ${isScrolled ? 'text-foreground' : ''}`}>
                RIN
              </span>
            </Link>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              <button className="text-foreground hover:text-muted-foreground transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button 
                onClick={toggleCart}
                className="text-foreground hover:text-muted-foreground transition-colors relative"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-foreground text-background text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 top-[72px] z-40 bg-background md:hidden px-4 py-8 overflow-y-auto"
          >
            <div className="flex flex-col space-y-6">
              <Link href="/shop" className="text-2xl font-serif">Shop All</Link>
              <div className="h-px bg-border/50 w-full" />
              {categories?.map((category) => (
                <Link key={category.id} href={`/collections/${category.slug}`} className="text-lg text-muted-foreground">
                  {category.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
