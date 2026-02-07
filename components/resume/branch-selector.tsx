"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GitBranch, Check, ChevronDown } from "lucide-react";
import type { MockBranch } from "@/lib/mock-data";

interface BranchSelectorProps {
  branches: MockBranch[];
  currentBranch: string;
  onSelect: (branchName: string) => void;
}

export function BranchSelector({
  branches,
  currentBranch,
  onSelect,
}: BranchSelectorProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = branches.find((b) => b.name === currentBranch);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 items-center gap-2 rounded-md border border-border bg-secondary px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary/80"
      >
        <GitBranch className="h-3.5 w-3.5 text-accent" />
        <span className="font-mono text-xs">{currentBranch}</span>
        {current?.isMain && (
          <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent">
            default
          </span>
        )}
        <ChevronDown className="h-3 w-3 text-muted-foreground" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border border-border bg-popover p-1 shadow-lg">
          <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
            Switch branch
          </div>
          {branches.map((branch) => (
            <button
              key={branch.id}
              onClick={() => {
                onSelect(branch.name);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                branch.name === currentBranch
                  ? "bg-secondary text-foreground"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <GitBranch className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
              <span className="truncate font-mono text-xs">{branch.name}</span>
              {branch.isMain && (
                <span className="ml-auto rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                  default
                </span>
              )}
              {branch.name === currentBranch && (
                <Check className="ml-auto h-3.5 w-3.5 text-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
