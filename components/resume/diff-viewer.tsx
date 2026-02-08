"use client";

import { cn } from "@/lib/utils";
import type { ResumeData } from "@/lib/mock-data";
import { Minus, Plus, PenLine } from "lucide-react";

interface DiffViewerProps {
  versionA: ResumeData;
  versionB: ResumeData;
  labelA: string;
  labelB: string;
}

type DiffStatus = "added" | "removed" | "modified" | "unchanged";

interface DiffField {
  label: string;
  section: string;
  valueA: string;
  valueB: string;
  status: DiffStatus;
}

function getStatus(a: string, b: string): DiffStatus {
  if (!a && b) return "added";
  if (a && !b) return "removed";
  if (a !== b) return "modified";
  return "unchanged";
}

function buildDiffFields(a: ResumeData, b: ResumeData): DiffField[] {
  const fields: DiffField[] = [];

  // Personal Info
  const personalKeys: (keyof typeof a.personalInfo)[] = [
    "fullName",
    "email",
    "phone",
    "location",
    "website",
    "summary",
  ];
  const personalLabels: Record<string, string> = {
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    location: "Location",
    website: "Website",
    summary: "Summary",
  };
  for (const key of personalKeys) {
    const va = a.personalInfo[key];
    const vb = b.personalInfo[key];
    fields.push({
      label: personalLabels[key],
      section: "Personal Info",
      valueA: va,
      valueB: vb,
      status: getStatus(va, vb),
    });
  }

  // Experience
  const maxExp = Math.max(a.experience.length, b.experience.length);
  for (let i = 0; i < maxExp; i++) {
    const ea = a.experience[i];
    const eb = b.experience[i];
    const prefix = `Experience ${i + 1}`;

    if (!ea && eb) {
      fields.push({
        label: `${prefix} - Company`,
        section: "Experience",
        valueA: "",
        valueB: eb.company,
        status: "added",
      });
      fields.push({
        label: `${prefix} - Title`,
        section: "Experience",
        valueA: "",
        valueB: eb.title,
        status: "added",
      });
      fields.push({
        label: `${prefix} - Description`,
        section: "Experience",
        valueA: "",
        valueB: eb.description,
        status: "added",
      });
    } else if (ea && !eb) {
      fields.push({
        label: `${prefix} - Company`,
        section: "Experience",
        valueA: ea.company,
        valueB: "",
        status: "removed",
      });
      fields.push({
        label: `${prefix} - Title`,
        section: "Experience",
        valueA: ea.title,
        valueB: "",
        status: "removed",
      });
      fields.push({
        label: `${prefix} - Description`,
        section: "Experience",
        valueA: ea.description,
        valueB: "",
        status: "removed",
      });
    } else if (ea && eb) {
      for (const key of ["company", "title", "location", "description"] as const) {
        const va = ea[key];
        const vb = eb[key];
        if (va !== vb) {
          fields.push({
            label: `${prefix} - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
            section: "Experience",
            valueA: va,
            valueB: vb,
            status: getStatus(va, vb),
          });
        }
      }
    }
  }

  // Skills
  const maxSkills = Math.max(a.skills.length, b.skills.length);
  for (let i = 0; i < maxSkills; i++) {
    const sa = a.skills[i];
    const sb = b.skills[i];
    const cat = sa?.category || sb?.category || `Category ${i + 1}`;
    const va = sa?.items || "";
    const vb = sb?.items || "";
    if (va !== vb) {
      fields.push({
        label: `Skills - ${cat}`,
        section: "Skills",
        valueA: va,
        valueB: vb,
        status: getStatus(va, vb),
      });
    }
  }

  // Projects
  const maxProj = Math.max(a.projects.length, b.projects.length);
  for (let i = 0; i < maxProj; i++) {
    const pa = a.projects[i];
    const pb = b.projects[i];
    const name = pa?.name || pb?.name || `Project ${i + 1}`;
    for (const key of ["name", "description", "technologies"] as const) {
      const va = pa?.[key] || "";
      const vb = pb?.[key] || "";
      if (va !== vb) {
        fields.push({
          label: `${name} - ${key.charAt(0).toUpperCase() + key.slice(1)}`,
          section: "Projects",
          valueA: va,
          valueB: vb,
          status: getStatus(va, vb),
        });
      }
    }
  }

  return fields;
}

const statusStyles = {
  added: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    icon: Plus,
    label: "Added",
  },
  removed: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-400",
    icon: Minus,
    label: "Removed",
  },
  modified: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    icon: PenLine,
    label: "Modified",
  },
  unchanged: {
    bg: "",
    border: "border-border",
    text: "text-muted-foreground",
    icon: PenLine,
    label: "Unchanged",
  },
};

export function DiffViewer({
  versionA,
  versionB,
  labelA,
  labelB,
}: DiffViewerProps) {
  const fields = buildDiffFields(versionA, versionB);
  const changedFields = fields.filter((f) => f.status !== "unchanged");

  const stats = {
    added: changedFields.filter((f) => f.status === "added").length,
    removed: changedFields.filter((f) => f.status === "removed").length,
    modified: changedFields.filter((f) => f.status === "modified").length,
  };

  // Group by section
  const sections: Record<string, DiffField[]> = {};
  for (const field of changedFields) {
    if (!sections[field.section]) sections[field.section] = [];
    sections[field.section].push(field);
  }

  return (
    <div className="space-y-6">
      {/* Summary bar */}
      <div className="flex items-center gap-4 rounded-lg border border-border bg-card px-4 py-3">
        <span className="text-xs font-medium text-foreground">
          {changedFields.length} change{changedFields.length !== 1 ? "s" : ""}
        </span>
        <div className="h-3 w-px bg-border" />
        {stats.added > 0 && (
          <span className="flex items-center gap-1 text-xs text-emerald-400">
            <Plus className="h-3 w-3" />
            {stats.added} added
          </span>
        )}
        {stats.removed > 0 && (
          <span className="flex items-center gap-1 text-xs text-rose-400">
            <Minus className="h-3 w-3" />
            {stats.removed} removed
          </span>
        )}
        {stats.modified > 0 && (
          <span className="flex items-center gap-1 text-xs text-amber-400">
            <PenLine className="h-3 w-3" />
            {stats.modified} modified
          </span>
        )}
      </div>

      {changedFields.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm font-medium text-foreground">
            No differences found
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            These two versions are identical
          </p>
        </div>
      ) : (
        Object.entries(sections).map(([sectionName, sectionFields]) => (
          <div key={sectionName}>
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              {sectionName}
            </h3>
            <div className="space-y-2">
              {sectionFields.map((field, idx) => {
                const style = statusStyles[field.status];
                const Icon = style.icon;
                return (
                  <div
                    key={`${field.label}-${idx}`}
                    className={cn(
                      "rounded-lg border p-4",
                      style.border,
                      style.bg
                    )}
                  >
                    {/* Field header */}
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className={cn("h-3.5 w-3.5", style.text)} />
                      <span className="text-xs font-semibold text-foreground">
                        {field.label}
                      </span>
                      <span
                        className={cn(
                          "ml-auto rounded px-1.5 py-0.5 font-mono text-[10px]",
                          style.text,
                          style.bg
                        )}
                      >
                        {style.label}
                      </span>
                    </div>

                    {/* Side-by-side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {labelA}
                        </span>
                        <div
                          className={cn(
                            "rounded-md border border-border bg-background p-3 text-xs leading-relaxed",
                            field.status === "removed" &&
                              "border-rose-500/20 bg-rose-500/5 line-through text-rose-300",
                            field.status === "modified" &&
                              "text-foreground/70",
                            !field.valueA && "italic text-muted-foreground/50"
                          )}
                        >
                          {field.valueA || "(empty)"}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {labelB}
                        </span>
                        <div
                          className={cn(
                            "rounded-md border border-border bg-background p-3 text-xs leading-relaxed",
                            field.status === "added" &&
                              "border-emerald-500/20 bg-emerald-500/5 text-emerald-300",
                            field.status === "modified" &&
                              "border-amber-500/20 bg-amber-500/5 text-foreground",
                            !field.valueB && "italic text-muted-foreground/50"
                          )}
                        >
                          {field.valueB || "(empty)"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
