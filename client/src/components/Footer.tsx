import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-secondary/50 pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="font-serif text-2xl font-bold tracking-tight block">
              RIN
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Curated essentials for the modern minimalist. Designed with purpose, crafted with care.
            </p>
          </div>
          
          <div>
            <h4 className="font-serif font-medium mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/shop" className="hover:text-foreground transition-colors">All Products</Link></li>
              <li><Link href="/collections/new" className="hover:text-foreground transition-colors">New Arrivals</Link></li>
              <li><Link href="/collections/best-sellers" className="hover:text-foreground transition-colors">Best Sellers</Link></li>
              <li><Link href="/collections/accessories" className="hover:text-foreground transition-colors">Accessories</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-medium mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-foreground transition-colors">Our Story</Link></li>
              <li><Link href="/sustainability" className="hover:text-foreground transition-colors">Sustainability</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-medium mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-background border border-border px-4 py-2 text-sm w-full focus:outline-none focus:border-foreground transition-colors"
              />
              <button className="bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-foreground/90 transition-colors">
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rin Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
