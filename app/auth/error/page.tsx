import Link from "next/link";
import { FileText, AlertCircle, ArrowLeft } from "lucide-react";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-destructive/50 bg-destructive/10">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>

        <h1 className="text-xl font-semibold font-sans tracking-tight">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {params?.error
            ? `Error: ${params.error}`
            : "An unspecified authentication error occurred. Please try again."}
        </p>

        <Link
          href="/auth"
          className="mt-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to sign in
        </Link>

        <div className="mt-12 flex items-center justify-center gap-2 text-muted-foreground/60">
          <FileText className="h-4 w-4" />
          <span className="text-xs font-mono">Shorui 書類</span>
        </div>
      </div>
    </div>
  );
}
