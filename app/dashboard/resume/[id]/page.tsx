"use client";

import { useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  GitBranchPlus,
  Pencil,
  Eye,
  History,
  GitBranch,
  Download,
} from "lucide-react";
import { BranchSelector } from "@/components/resume/branch-selector";
import { ResumeEditor } from "@/components/resume/resume-editor";
import { ResumePreview } from "@/components/resume/resume-preview";
import { CommitHistory } from "@/components/resume/commit-history";
import { BranchTree } from "@/components/resume/branch-tree";
import { CommitDialog } from "@/components/resume/commit-dialog";
import { NewBranchDialog } from "@/components/resume/new-branch-dialog";
import {
  mockResumeData,
  mockBranches,
  mockCommits,
  type ResumeData,
} from "@/lib/mock-data";

const tabs = [
  { key: "editor", label: "Editor", icon: Pencil },
  { key: "preview", label: "Preview", icon: Eye },
  { key: "history", label: "History", icon: History },
  { key: "branches", label: "Branches", icon: GitBranch },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export default function ResumeEditorPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const [activeTab, setActiveTab] = useState<TabKey>("editor");
  const [currentBranch, setCurrentBranch] = useState("main");
  const [resumeData, setResumeData] = useState<ResumeData>(mockResumeData);
  const [commitDialogOpen, setCommitDialogOpen] = useState(false);
  const [branchDialogOpen, setBranchDialogOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleDataChange = useCallback((data: ResumeData) => {
    setResumeData(data);
    setHasChanges(true);
  }, []);

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-card px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="h-4 w-px bg-border" />
          <BranchSelector
            branches={mockBranches}
            currentBranch={currentBranch}
            onSelect={setCurrentBranch}
          />
        </div>

        <div className="flex items-center gap-2">
          {hasChanges && (
            <span className="mr-1 rounded bg-amber-500/15 px-2 py-0.5 font-mono text-[10px] text-amber-400">
              unsaved
            </span>
          )}
          <button
            onClick={() => setCommitDialogOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Save className="h-3.5 w-3.5" />
            Commit
          </button>
          <button
            onClick={() => setBranchDialogOpen(true)}
            className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            <GitBranchPlus className="h-3.5 w-3.5" />
            Branch
          </button>
          <button
            onClick={() =>
              router.push(`/dashboard/resume/${resumeId}/diff`)
            }
            className="flex h-8 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary/80"
          >
            <Download className="h-3.5 w-3.5" />
            Diff
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex shrink-0 border-b border-border bg-card px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 px-4 py-2.5 text-xs font-medium transition-colors",
                isActive
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "editor" && (
          <div className="mx-auto max-w-3xl p-6">
            <ResumeEditor data={resumeData} onChange={handleDataChange} />
          </div>
        )}

        {activeTab === "preview" && (
          <div className="p-6">
            <ResumePreview data={resumeData} />
          </div>
        )}

        {activeTab === "history" && (
          <div className="mx-auto max-w-2xl p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-foreground">
                Commit History
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Branch:{" "}
                <span className="font-mono text-accent">{currentBranch}</span>
              </p>
            </div>
            <CommitHistory
              commits={mockCommits}
              currentBranch={currentBranch}
            />
          </div>
        )}

        {activeTab === "branches" && (
          <div className="mx-auto max-w-2xl p-6">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-foreground">
                Branch Tree
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {mockBranches.length} branch
                {mockBranches.length !== 1 ? "es" : ""}
              </p>
            </div>
            <BranchTree
              branches={mockBranches}
              commits={mockCommits}
              currentBranch={currentBranch}
              onSelectBranch={setCurrentBranch}
            />
          </div>
        )}
      </div>

      {/* Dialogs */}
      <CommitDialog
        open={commitDialogOpen}
        onClose={() => setCommitDialogOpen(false)}
        onCommit={(message) => {
          setCommitDialogOpen(false);
          setHasChanges(false);
        }}
        branchName={currentBranch}
      />
      <NewBranchDialog
        open={branchDialogOpen}
        onClose={() => setBranchDialogOpen(false)}
        onCreate={(name) => {
          setBranchDialogOpen(false);
          setCurrentBranch(name);
        }}
        sourceBranch={currentBranch}
      />
    </div>
  );
}
