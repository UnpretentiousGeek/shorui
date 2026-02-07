import { FileText } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-accent" />
          <span className="text-sm font-semibold font-sans">Shorui</span>
          <span className="text-xs text-muted-foreground font-mono">書類</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built for developers who take their careers as seriously as their code.
        </p>
      </div>
    </footer>
  );
}
