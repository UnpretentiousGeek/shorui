import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pt-36 pb-24 text-center md:pt-48 md:pb-32">
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,oklch(1_0_0/3%)_1px,transparent_1px),linear-gradient(to_bottom,oklch(1_0_0/3%)_1px,transparent_1px)] bg-[size:64px_64px]"
      />

      {/* Badge */}
      <div className="relative mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-xs font-medium text-muted-foreground font-mono">
          Version control for resumes
        </span>
      </div>

      {/* Heading */}
      <h1 className="relative max-w-3xl text-balance font-sans text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
        <span className="text-foreground">Shorui</span>{" "}
        <span className="text-muted-foreground font-mono font-normal">
          書類
        </span>
      </h1>

      {/* Subheading */}
      <p className="relative mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
        Git-like version control for your resumes. Branch for every job
        application, track changes, diff versions, and never lose a version
        again.
      </p>

      {/* CTA Buttons */}
      <div className="relative mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/auth"
          className="group flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Get Started
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <a
          href="#features"
          className="rounded-md border border-border bg-secondary px-6 py-3 text-sm text-foreground transition-colors hover:bg-secondary/80"
        >
          See How It Works
        </a>
      </div>

      {/* Terminal-style preview */}
      <div className="relative mt-20 w-full max-w-2xl">
        <div className="rounded-lg border border-border bg-card p-1">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 text-xs text-muted-foreground font-mono">
              shorui
            </span>
          </div>
          <div className="space-y-2 p-4 font-mono text-xs leading-relaxed md:text-sm">
            <div className="flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">
                shorui branch create google-swe-2026
              </span>
            </div>
            <div className="text-muted-foreground">
              {'Created branch "google-swe-2026" from main'}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">
                shorui commit -m &quot;Tailor experience for SWE role&quot;
              </span>
            </div>
            <div className="text-muted-foreground">
              {"[google-swe-2026 a3f7c2d] Tailor experience for SWE role"}
            </div>
            <div className="text-muted-foreground">
              {"  2 sections changed, 14 insertions(+), 3 deletions(-)"}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">shorui export --pdf</span>
            </div>
            <div className="text-muted-foreground">
              {"Exported resume-google-swe-2026.pdf"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
