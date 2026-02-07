"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowLeft, ChevronDown, GitCompareArrows } from "lucide-react";
import { DiffViewer } from "@/components/resume/diff-viewer";
import {
  mockResumeData,
  mockResumeDataV2,
  mockCommits,
} from "@/lib/mock-data";

const versionOptions = [
  {
    id: "v1",
    label: "a1b2c3d — Initial resume setup",
    data: mockResumeData,
  },
  {
    id: "v2",
    label: "c2d3e4f — Update contact info and website",
    data: mockResumeDataV2,
  },
];

function VersionDropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (id: string) => void;
  options: typeof versionOptions;
}) {
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

  const selected = options.find((o) => o.id === value);

  return (
    <div className="relative flex-1" ref={ref}>
      <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-9 w-full items-center justify-between rounded-md border border-border bg-secondary px-3 text-left transition-colors hover:bg-secondary/80"
      >
        <span className="truncate font-mono text-xs text-foreground">
          {selected?.label || "Select version"}
        </span>
        <ChevronDown className="ml-2 h-3 w-3 shrink-0 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-lg border border-border bg-popover p-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => {
                onChange(opt.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center rounded-md px-3 py-2 text-left text-xs transition-colors",
                opt.id === value
                  ? "bg-secondary text-foreground"
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <span className="truncate font-mono">{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DiffPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const [versionA, setVersionA] = useState("v1");
  const [versionB, setVersionB] = useState("v2");

  const dataA = versionOptions.find((o) => o.id === versionA)!;
  const dataB = versionOptions.find((o) => o.id === versionB)!;

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar */}
      <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
        <button
          onClick={() => router.push(`/dashboard/resume/${resumeId}`)}
          className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          aria-label="Back to editor"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="h-4 w-px bg-border" />
        <GitCompareArrows className="h-4 w-4 text-accent" />
        <h1 className="text-sm font-semibold text-foreground">
          Diff View
        </h1>
      </header>

      {/* Version selectors */}
      <div className="shrink-0 border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-end gap-4">
          <VersionDropdown
            label="Version A (base)"
            value={versionA}
            onChange={setVersionA}
            options={versionOptions}
          />
          <div className="flex h-9 items-center">
            <GitCompareArrows className="h-4 w-4 text-muted-foreground" />
          </div>
          <VersionDropdown
            label="Version B (compare)"
            value={versionB}
            onChange={setVersionB}
            options={versionOptions}
          />
        </div>
      </div>

      {/* Diff content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl">
          <DiffViewer
            versionA={dataA.data}
            versionB={dataB.data}
            labelA={dataA.label.split(" — ")[0]}
            labelB={dataB.label.split(" — ")[0]}
          />
        </div>
      </div>
    </div>
  );
}
