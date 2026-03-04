import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row">
        {/* Left */}
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link to="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
