"use client";

import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileText, Github, ArrowLeft, Loader2 } from "lucide-react";

type AuthMode = "sign-in" | "sign-up";

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const switchMode = (newMode: AuthMode) => {
    resetForm();
    setMode(newMode);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (mode === "sign-up" && password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      if (mode === "sign-in") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push("/dashboard");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo:
              process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
              `${window.location.origin}/dashboard`,
          },
        });
        if (error) throw error;
        router.push("/auth/sign-up-success");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "github" | "google") => {
    const supabase = createClient();
    setSocialLoading(provider);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSocialLoading(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Left side - branding */}
      <div className="hidden flex-col justify-between border-r border-border bg-card p-10 lg:flex lg:w-1/2">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-mono">Back</span>
        </Link>

        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-accent" />
            <div>
              <h2 className="text-2xl font-bold font-sans tracking-tight">
                Shorui
              </h2>
              <p className="text-sm text-muted-foreground font-mono">書類</p>
            </div>
          </div>
          <p className="max-w-sm text-pretty text-muted-foreground leading-relaxed">
            Version control for your resumes. Create branches for every job
            application, track changes over time, and never lose a version
            again.
          </p>
        </div>

        {/* Terminal preview */}
        <div className="rounded-lg border border-border bg-background p-1">
          <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
            <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
            <span className="ml-2 text-[11px] text-muted-foreground font-mono">
              ~/resumes
            </span>
          </div>
          <div className="space-y-1.5 p-4 font-mono text-xs leading-relaxed">
            <div className="flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">shorui status</span>
            </div>
            <div className="text-muted-foreground">
              {"On branch main"}
            </div>
            <div className="text-muted-foreground">
              {"3 resumes, 12 branches, 47 commits"}
            </div>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-accent">$</span>
              <span className="text-foreground">shorui log --oneline -3</span>
            </div>
            <div className="text-muted-foreground">
              {"a3f7c2d Update skills section"}
            </div>
            <div className="text-muted-foreground">
              {"b1e4f9a Add React Native experience"}
            </div>
            <div className="text-muted-foreground">
              {"c8d2a1b Initial resume commit"}
            </div>
          </div>
        </div>
      </div>

      {/* Right side - auth form */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10">
        {/* Mobile back link */}
        <div className="mb-8 flex w-full max-w-sm justify-start lg:hidden">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-mono">Back</span>
          </Link>
        </div>

        <div className="w-full max-w-sm">
          {/* Logo on mobile */}
          <div className="mb-8 flex items-center gap-2 lg:hidden">
            <FileText className="h-6 w-6 text-accent" />
            <span className="text-lg font-semibold font-sans tracking-tight">
              Shorui
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              書類
            </span>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex rounded-lg border border-border bg-secondary p-1">
            <button
              type="button"
              onClick={() => switchMode("sign-in")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "sign-in"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("sign-up")}
              className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                mode === "sign-up"
                  ? "bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-xl font-semibold font-sans tracking-tight">
              {mode === "sign-in"
                ? "Welcome back"
                : "Create your account"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "sign-in"
                ? "Sign in to continue to your resumes"
                : "Start version controlling your resumes"}
            </p>
          </div>

          {/* Social buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={socialLoading !== null || isLoading}
              className="flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {socialLoading === "github" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Github className="h-4 w-4" />
              )}
              Continue with GitHub
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={socialLoading !== null || isLoading}
              className="flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {socialLoading === "google" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
              )}
              Continue with Google
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-mono">or</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {mode === "sign-up" && (
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-md border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}

            {error && (
              <div className="rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || socialLoading !== null}
              className="flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {mode === "sign-in" ? "Signing in..." : "Creating account..."}
                </>
              ) : mode === "sign-in" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === "sign-in" ? (
              <>
                {"Don't have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode("sign-up")}
                  className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                {"Already have an account? "}
                <button
                  type="button"
                  onClick={() => switchMode("sign-in")}
                  className="text-foreground underline underline-offset-4 hover:text-accent transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
