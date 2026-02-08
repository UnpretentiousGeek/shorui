"use client";

import { useState, useEffect, useRef } from "react";
import { GitBranchPlus, X } from "lucide-react";

interface NewBranchDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
  sourceBranch: string;
}

export function NewBranchDialog({
  open,
  onClose,
  onCreate,
  sourceBranch,
}: NewBranchDialogProps) {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onClose]);

  if (!open) return null;

  // Sanitize branch name (git conventions)
  const sanitized = name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_/]/g, "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!sanitized) return;
    onCreate(sanitized);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <GitBranchPlus className="h-4 w-4 text-accent" />
            <h2 className="text-sm font-semibold text-foreground">
              Create new branch
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="mb-4 text-xs text-muted-foreground">
          Branching from{" "}
          <span className="font-mono text-accent">{sourceBranch}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">
              Branch name
            </label>
            <input
              ref={inputRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. google-swe-2026"
              className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {name && sanitized !== name && (
              <p className="text-[11px] text-muted-foreground">
                Will be created as{" "}
                <span className="font-mono text-accent">{sanitized}</span>
              </p>
            )}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="h-8 rounded-md px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!sanitized}
              className="h-8 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create branch
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
