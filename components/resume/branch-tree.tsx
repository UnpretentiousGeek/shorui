"use client";

import { cn } from "@/lib/utils";
import { GitBranch, GitCommitHorizontal, Circle } from "lucide-react";
import type { MockBranch, MockCommit } from "@/lib/mock-data";

interface BranchTreeProps {
  branches: MockBranch[];
  commits: MockCommit[];
  currentBranch: string;
  onSelectBranch: (name: string) => void;
}

const branchColors = [
  "text-accent border-accent bg-accent/10",
  "text-amber-400 border-amber-400 bg-amber-400/10",
  "text-rose-400 border-rose-400 bg-rose-400/10",
  "text-violet-400 border-violet-400 bg-violet-400/10",
  "text-blue-400 border-blue-400 bg-blue-400/10",
];

const lineColors = [
  "bg-accent",
  "bg-amber-400",
  "bg-rose-400",
  "bg-violet-400",
  "bg-blue-400",
];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function BranchTree({
  branches,
  commits,
  currentBranch,
  onSelectBranch,
}: BranchTreeProps) {
  // Build the tree: main first, then children sorted by creation date
  const main = branches.find((b) => b.isMain);
  if (!main) return null;

  const sortedBranches = [
    main,
    ...branches
      .filter((b) => !b.isMain)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      ),
  ];

  return (
    <div className="space-y-2">
      {sortedBranches.map((branch, idx) => {
        const branchCommits = commits
          .filter((c) => c.branchName === branch.name)
          .sort(
            (a, b) =>
              new Date(a.timestamp).getTime() -
              new Date(b.timestamp).getTime()
          );
        const colorIdx = idx % branchColors.length;
        const isActive = branch.name === currentBranch;
        const indent = branch.parentId
          ? branches.findIndex((b) => b.id === branch.parentId) >= 0
            ? 1
            : 0
          : 0;

        return (
          <div key={branch.id}>
            {/* Branch header */}
            <button
              onClick={() => onSelectBranch(branch.name)}
              className={cn(
                "flex w-full items-center gap-2 rounded-lg border px-3 py-2.5 text-left transition-all",
                isActive
                  ? "border-accent/40 bg-accent/10"
                  : "border-border bg-card hover:border-border hover:bg-secondary"
              )}
              style={{ marginLeft: indent * 24 }}
            >
              <GitBranch
                className={cn("h-4 w-4 shrink-0", branchColors[colorIdx].split(" ")[0])}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate font-mono text-xs font-medium text-foreground">
                    {branch.name}
                  </span>
                  {branch.isMain && (
                    <span className="rounded bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] text-accent">
                      default
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {branchCommits.length} commit{branchCommits.length !== 1 ? "s" : ""}
                  {" -- "}
                  Created {formatDate(branch.createdAt)}
                </p>
              </div>
              {isActive && (
                <Circle className="h-2 w-2 shrink-0 fill-accent text-accent" />
              )}
            </button>

            {/* Commit nodes for this branch */}
            {isActive && branchCommits.length > 0 && (
              <div
                className="ml-5 mt-1 space-y-0"
                style={{ marginLeft: indent * 24 + 20 }}
              >
                {branchCommits.map((commit, cIdx) => (
                  <div key={commit.id} className="flex items-center gap-2">
                    {/* Vertical line + node */}
                    <div className="flex flex-col items-center">
                      {cIdx > 0 && (
                        <div
                          className={cn("h-4 w-px", lineColors[colorIdx])}
                        />
                      )}
                      <GitCommitHorizontal
                        className={cn(
                          "h-3.5 w-3.5",
                          branchColors[colorIdx].split(" ")[0]
                        )}
                      />
                      {cIdx < branchCommits.length - 1 && (
                        <div
                          className={cn("h-4 w-px", lineColors[colorIdx])}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1 py-1">
                      <span className="text-xs text-foreground">
                        {commit.message}
                      </span>
                      <span className="ml-2 font-mono text-[10px] text-muted-foreground">
                        {commit.hash}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
