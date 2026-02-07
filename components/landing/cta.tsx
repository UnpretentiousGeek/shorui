import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-lg border border-border bg-card p-12 text-center md:p-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Stop losing resume versions
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-muted-foreground">
            Join developers who manage their resumes the same way they manage
            code. Free to start, no credit card required.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth"
              className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
            >
              Get Started for Free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
