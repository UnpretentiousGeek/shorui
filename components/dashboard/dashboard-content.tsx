"use client";

import { useState, useMemo } from "react";
import type { Resume, Branch } from "@/types";
import { Topbar } from "@/components/dashboard/topbar";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ResumeCard } from "@/components/dashboard/resume-card";
import { NewResumeDialog } from "@/components/dashboard/new-resume-dialog";
import { Plus, FileText } from "lucide-react";

interface ResumeWithBranches extends Resume {
  branches: { count: number }[];
}

interface DashboardContentProps {
  resumes: ResumeWithBranches[];
  userEmail: string;
  userName?: string;
}

function getResumeStatus(
  updatedAt: string
): "active" | "draft" | "archived" {
  const diff = Date.now() - new Date(updatedAt).getTime();
  const days = diff / (1000 * 60 * 60 * 24);
  if (days < 7) return "active";
  if (days < 30) return "draft";
  return "archived";
}

export function DashboardContent({
  resumes,
  userEmail,
  userName,
}: DashboardContentProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return resumes;
    const q = searchQuery.toLowerCase();
    return resumes.filter((r) => r.title.toLowerCase().includes(q));
  }, [resumes, searchQuery]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          userEmail={userEmail}
          userName={userName}
          onSearch={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {/* Page header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                Resumes
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {resumes.length}{" "}
                {resumes.length === 1 ? "resume" : "resumes"} total
              </p>
            </div>
            <button
              onClick={() => setDialogOpen(true)}
              className="flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Plus className="h-4 w-4" />
              New Resume
            </button>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  id={resume.id}
                  title={resume.title}
                  updatedAt={resume.updated_at}
                  branchCount={resume.branches?.[0]?.count ?? 0}
                  status={getResumeStatus(resume.updated_at)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary mb-4">
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              {searchQuery.trim() ? (
                <>
                  <p className="text-sm font-medium text-foreground">
                    No results found
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {"Try a different search query"}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm font-medium text-foreground">
                    No resumes yet
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Create your first resume to get started
                  </p>
                  <button
                    onClick={() => setDialogOpen(true)}
                    className="mt-4 flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                    New Resume
                  </button>
                </>
              )}
            </div>
          )}
        </main>
      </div>

      <NewResumeDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
}
