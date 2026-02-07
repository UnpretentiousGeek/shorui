"use client";

import { cn } from "@/lib/utils";
import { GitCommitHorizontal } from "lucide-react";
import type { MockCommit } from "@/lib/mock-data";

interface CommitHistoryProps {
  commits: MockCommit[];
  currentBranch: string;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function CommitHistory({
  commits,
  currentBranch,
}: CommitHistoryProps) {
  const filtered = commits
    .filter((c) => c.branchName === currentBranch)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <GitCommitHorizontal className="h-8 w-8 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground">
          No commits on this branch yet
        </p>
      </div>
    );
  }

  // Group by date
  const groups: Record<string, MockCommit[]> = {};
  for (const commit of filtered) {
    const date = formatDate(commit.timestamp);
    if (!groups[date]) groups[date] = [];
    groups[date].push(commit);
  }

  return (
    <div className="space-y-6">
      {Object.entries(groups).map(([date, dateCommits]) => (
        <div key={date}>
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              {date}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="space-y-1">
            {dateCommits.map((commit, idx) => (
              <div
                key={commit.id}
                className="group flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary"
              >
                {/* Timeline dot and line */}
                <div className="flex flex-col items-center pt-1">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-background" />
                  {idx < dateCommits.length - 1 && (
                    <div className="mt-1 h-8 w-px bg-border" />
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {commit.message}
                  </p>
                  <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="font-mono text-accent">
                      {commit.hash}
                    </span>
                    <span>{commit.author}</span>
                    <span>{formatTime(commit.timestamp)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
