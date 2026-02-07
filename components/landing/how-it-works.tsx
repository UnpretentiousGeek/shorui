const steps = [
  {
    number: "01",
    title: "Create your base resume",
    description:
      "Start with your main branch. Build your master resume with all your experience, skills, and projects.",
  },
  {
    number: "02",
    title: "Branch for each application",
    description:
      "Create a new branch for every company or role. Tailor sections, reorder content, tweak wording.",
  },
  {
    number: "03",
    title: "Commit your changes",
    description:
      "Every edit is a commit. Add messages to remember what you changed and why. Full history at your fingertips.",
  },
  {
    number: "04",
    title: "Export and apply",
    description:
      "Export any branch as a polished PDF. Apply with confidence knowing every version is safe and diffable.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-accent font-mono">
            How It Works
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            A workflow you already know
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
            If you have ever used git, you will feel right at home. Same
            concepts, applied to resumes.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
          {steps.map((step) => (
            <div key={step.number} className="bg-card p-6 md:p-8">
              <span className="mb-4 block font-mono text-2xl font-bold text-accent">
                {step.number}
              </span>
              <h3 className="mb-2 text-sm font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
