"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { GitBranch, Clock, MoreHorizontal, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { deleteResume } from "@/app/dashboard/actions";

interface ResumeCardProps {
  id: string;
  title: string;
  updatedAt: string;
  branchCount: number;
  status: "active" | "draft" | "archived";
}

const statusConfig = {
  active: { color: "bg-emerald-500", label: "Active" },
  draft: { color: "bg-amber-500", label: "Draft" },
  archived: { color: "bg-muted-foreground", label: "Archived" },
};

export function ResumeCard({
  id,
  title,
  updatedAt,
  branchCount,
  status,
}: ResumeCardProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { color, label } = statusConfig[status];

  const timeAgo = getRelativeTime(updatedAt);

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    setMenuOpen(false);
    setDeleting(true);
    await deleteResume(id);
    setDeleting(false);
  }

  return (
    <div
      onClick={() => router.push(`/dashboard/resume/${id}`)}
      className={cn(
        "group relative cursor-pointer rounded-lg border border-border bg-card p-5 transition-all hover:border-accent/40 hover:shadow-md",
        deleting && "pointer-events-none opacity-50"
      )}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") router.push(`/dashboard/resume/${id}`);
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={cn("h-2.5 w-2.5 shrink-0 rounded-full", color)}
            aria-label={`Status: ${label}`}
          />
          <h3 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h3>
        </div>

        {/* More menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground opacity-0 transition-all hover:bg-secondary hover:text-foreground group-hover:opacity-100"
            aria-label="Resume actions"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-border bg-popover p-1 shadow-lg">
              <button
                onClick={handleDelete}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-destructive transition-colors hover:bg-secondary"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Meta row */}
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <GitBranch className="h-3.5 w-3.5" />
          {branchCount} {branchCount === 1 ? "branch" : "branches"}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {timeAgo}
        </span>
      </div>

      {/* Status badge */}
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {label}
        </span>
      </div>
    </div>
  );
}

function getRelativeTime(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60)
    return `${diffMins} min${diffMins === 1 ? "" : "s"} ago`;
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
  if (diffDays < 30)
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  return date.toLocaleDateString();
}
