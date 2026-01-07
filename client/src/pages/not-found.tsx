import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-9xl font-serif text-muted/50 font-bold">404</h1>
        <h2 className="text-2xl font-serif">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="pt-4">
          <Link href="/" className="inline-block bg-foreground text-background px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
            RETURN HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
