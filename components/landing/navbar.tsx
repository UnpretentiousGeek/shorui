import Link from "next/link";
import { FileText } from "lucide-react";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-accent" />
          <span className="text-sm font-semibold tracking-tight font-sans">
            Shorui
          </span>
          <span className="text-xs text-muted-foreground font-mono">書類</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#features"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            How It Works
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/auth"
            className="rounded-md border border-border bg-secondary px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary/80"
          >
            Sign In
          </Link>
          <Link
            href="/auth"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Get Started
          </Link>
        </div>
      </nav>
    </header>
  );
}
