import { useProducts, useCategories } from "@/hooks/use-shop";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const { data: products, isLoading: productsLoading } = useProducts({ featured: true });
  const { data: categories, isLoading: categoriesLoading } = useCategories();

  if (productsLoading || categoriesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full bg-secondary overflow-hidden">
        <div className="absolute inset-0">
          {/* Landing page hero - minimalist interior or fashion */}
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2940&auto=format&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="relative h-full container mx-auto px-4 md:px-6 flex flex-col justify-center items-start text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl space-y-6"
          >
            <span className="text-sm md:text-base tracking-[0.2em] font-medium uppercase text-white/90">
              New Collection 2024
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight text-white">
              Elegance in <br /> Simplicity
            </h1>
            <p className="text-lg text-white/80 max-w-md font-light">
              Discover our curated selection of timeless essentials designed for the modern lifestyle.
            </p>
            <div className="pt-4">
              <Link href="/shop" className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-sm font-medium tracking-wide hover:bg-white/90 transition-colors">
                DISCOVER NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-medium">Collections</h2>
            <Link href="/collections" className="hidden md:flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors group">
              View All <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories?.slice(0, 3).map((category, index) => (
              <Link key={category.id} href={`/collections/${category.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative aspect-[4/3] overflow-hidden cursor-pointer bg-secondary"
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/10" />
                  <div className="absolute bottom-8 left-8 text-white">
                    <h3 className="text-2xl font-serif mb-2">{category.name}</h3>
                    <span className="text-sm font-medium border-b border-white pb-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Shop Now
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3 block">Selected For You</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">Featured Arrivals</h2>
            <div className="w-12 h-px bg-foreground mx-auto mt-6" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/shop" className="inline-block border border-foreground px-8 py-3 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
              VIEW ALL PRODUCTS
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Values / Editorial */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-[4/5] overflow-hidden"
            >
              {/* Minimalist workspace or lifestyle shot */}
              <img
                src="https://images.unsplash.com/photo-1497206365907-f5e630693df0?q=80&w=2080&auto=format&fit=crop"
                alt="Brand Lifestyle"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-serif font-medium leading-tight">
                Designed for <br /> Longevity
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We believe in fewer, better things. Our philosophy is rooted in the appreciation of quality materials and meticulous craftsmanship.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div>
                  <h4 className="font-serif text-xl mb-2">Sustainable</h4>
                  <p className="text-sm text-muted-foreground">Ethically sourced materials and responsible production methods.</p>
                </div>
                <div>
                  <h4 className="font-serif text-xl mb-2">Timeless</h4>
                  <p className="text-sm text-muted-foreground">Designs that transcend trends and seasons.</p>
                </div>
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 text-sm font-medium border-b border-foreground pb-1 hover:text-muted-foreground hover:border-muted-foreground transition-colors">
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
