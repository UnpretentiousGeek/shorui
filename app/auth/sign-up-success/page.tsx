import Link from "next/link";
import { FileText, Mail, ArrowLeft } from "lucide-react";

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-foreground">
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card">
          <Mail className="h-6 w-6 text-accent" />
        </div>

        <h1 className="text-xl font-semibold font-sans tracking-tight">
          Check your email
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          We sent you a confirmation link. Please check your email to verify
          your account before signing in.
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
