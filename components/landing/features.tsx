import { GitBranch, History, FileDiff, Download } from "lucide-react";

const features = [
  {
    icon: History,
    title: "Version History",
    description:
      "Every change is tracked with commits. Revert to any previous version instantly, just like git log.",
    detail: "shorui log --oneline",
  },
  {
    icon: GitBranch,
    title: "Branching",
    description:
      "Create branches for each job application. Tailor your resume without losing the original.",
    detail: "shorui branch create stripe-pm",
  },
  {
    icon: FileDiff,
    title: "Diff View",
    description:
      "See exactly what changed between versions. Line-by-line comparisons of every section.",
    detail: "shorui diff main..google-swe",
  },
  {
    icon: Download,
    title: "Export",
    description:
      "Export any version as a polished PDF. Print-ready formatting with one command.",
    detail: "shorui export --pdf --branch main",
  },
];

export function Features() {
  return (
    <section id="features" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent font-mono">
            Features
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to manage resume versions
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            Built with the mental model developers already know. If you
            understand git, you understand Shorui.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/30"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary">
                  <feature.icon className="h-4 w-4 text-accent" />
                </div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
              <div className="rounded-md bg-secondary/60 px-3 py-2 font-mono text-xs text-muted-foreground">
                <span className="text-accent">$</span> {feature.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
