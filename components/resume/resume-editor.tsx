"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderOpen,
} from "lucide-react";
import type {
  ResumeData,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  ProjectItem,
} from "@/lib/mock-data";

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const sectionConfig = [
  { key: "personal" as const, label: "Personal Info", icon: User },
  { key: "experience" as const, label: "Experience", icon: Briefcase },
  { key: "education" as const, label: "Education", icon: GraduationCap },
  { key: "skills" as const, label: "Skills", icon: Wrench },
  { key: "projects" as const, label: "Projects", icon: FolderOpen },
];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs font-medium text-muted-foreground">
      {children}
    </label>
  );
}

function FieldInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-8 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring"
    />
  );
}

function FieldTextarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-ring resize-none"
    />
  );
}

type SectionKey = (typeof sectionConfig)[number]["key"];

export function ResumeEditor({ data, onChange }: ResumeEditorProps) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [draggedSection, setDraggedSection] = useState<SectionKey | null>(null);
  const [sectionOrder, setSectionOrder] = useState<SectionKey[]>(
    sectionConfig.map((s) => s.key)
  );

  function toggleSection(key: string) {
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleDragStart(key: SectionKey) {
    setDraggedSection(key);
  }

  function handleDragOver(e: React.DragEvent, key: SectionKey) {
    e.preventDefault();
    if (!draggedSection || draggedSection === key) return;
    const newOrder = [...sectionOrder];
    const fromIdx = newOrder.indexOf(draggedSection);
    const toIdx = newOrder.indexOf(key);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, draggedSection);
    setSectionOrder(newOrder);
  }

  function handleDragEnd() {
    setDraggedSection(null);
  }

  function updatePersonal(field: string, value: string) {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  }

  function updateExperience(idx: number, field: string, value: string) {
    const updated = [...data.experience];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, experience: updated });
  }

  function addExperience() {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        {
          id: `exp-${Date.now()}`,
          company: "",
          title: "",
          location: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    });
  }

  function removeExperience(idx: number) {
    onChange({
      ...data,
      experience: data.experience.filter((_, i) => i !== idx),
    });
  }

  function updateEducation(idx: number, field: string, value: string) {
    const updated = [...data.education];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, education: updated });
  }

  function addEducation() {
    onChange({
      ...data,
      education: [
        ...data.education,
        {
          id: `edu-${Date.now()}`,
          school: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: "",
        },
      ],
    });
  }

  function removeEducation(idx: number) {
    onChange({
      ...data,
      education: data.education.filter((_, i) => i !== idx),
    });
  }

  function updateSkill(idx: number, field: string, value: string) {
    const updated = [...data.skills];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, skills: updated });
  }

  function addSkill() {
    onChange({
      ...data,
      skills: [
        ...data.skills,
        { id: `skill-${Date.now()}`, category: "", items: "" },
      ],
    });
  }

  function removeSkill(idx: number) {
    onChange({
      ...data,
      skills: data.skills.filter((_, i) => i !== idx),
    });
  }

  function updateProject(idx: number, field: string, value: string) {
    const updated = [...data.projects];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange({ ...data, projects: updated });
  }

  function addProject() {
    onChange({
      ...data,
      projects: [
        ...data.projects,
        {
          id: `proj-${Date.now()}`,
          name: "",
          description: "",
          technologies: "",
          link: "",
        },
      ],
    });
  }

  function removeProject(idx: number) {
    onChange({
      ...data,
      projects: data.projects.filter((_, i) => i !== idx),
    });
  }

  const orderedSections = sectionOrder.map(
    (key) => sectionConfig.find((s) => s.key === key)!
  );

  function renderSection(section: (typeof sectionConfig)[number]) {
    const isCollapsed = collapsed[section.key] ?? false;
    const Icon = section.icon;

    return (
      <div
        key={section.key}
        draggable
        onDragStart={() => handleDragStart(section.key)}
        onDragOver={(e) => handleDragOver(e, section.key)}
        onDragEnd={handleDragEnd}
        className={cn(
          "rounded-lg border border-border bg-card transition-all",
          draggedSection === section.key && "opacity-50"
        )}
      >
        {/* Section header */}
        <button
          onClick={() => toggleSection(section.key)}
          className="flex w-full items-center gap-2 px-4 py-3 text-left"
        >
          <GripVertical className="h-4 w-4 shrink-0 cursor-grab text-muted-foreground/50" />
          <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
          <span className="flex-1 text-sm font-medium text-foreground">
            {section.label}
          </span>
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {/* Section content */}
        {!isCollapsed && (
          <div className="border-t border-border px-4 py-4">
            {section.key === "personal" && renderPersonal()}
            {section.key === "experience" && renderExperience()}
            {section.key === "education" && renderEducationSection()}
            {section.key === "skills" && renderSkills()}
            {section.key === "projects" && renderProjects()}
          </div>
        )}
      </div>
    );
  }

  function renderPersonal() {
    const p = data.personalInfo;
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-1.5 sm:col-span-2">
          <FieldLabel>Full Name</FieldLabel>
          <FieldInput
            value={p.fullName}
            onChange={(v) => updatePersonal("fullName", v)}
            placeholder="John Doe"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Email</FieldLabel>
          <FieldInput
            value={p.email}
            onChange={(v) => updatePersonal("email", v)}
            placeholder="john@example.com"
            type="email"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Phone</FieldLabel>
          <FieldInput
            value={p.phone}
            onChange={(v) => updatePersonal("phone", v)}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Location</FieldLabel>
          <FieldInput
            value={p.location}
            onChange={(v) => updatePersonal("location", v)}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="space-y-1.5">
          <FieldLabel>Website</FieldLabel>
          <FieldInput
            value={p.website}
            onChange={(v) => updatePersonal("website", v)}
            placeholder="https://yoursite.dev"
          />
        </div>
        <div className="space-y-1.5 sm:col-span-2">
          <FieldLabel>Summary</FieldLabel>
          <FieldTextarea
            value={p.summary}
            onChange={(v) => updatePersonal("summary", v)}
            placeholder="A brief professional summary..."
            rows={3}
          />
        </div>
      </div>
    );
  }

  function renderExperience() {
    return (
      <div className="space-y-4">
        {data.experience.map((exp, idx) => (
          <div
            key={exp.id}
            className="rounded-md border border-border/50 bg-background p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Position {idx + 1}
              </span>
              <button
                onClick={() => removeExperience(idx)}
                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove experience"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel>Company</FieldLabel>
                <FieldInput
                  value={exp.company}
                  onChange={(v) => updateExperience(idx, "company", v)}
                  placeholder="Company name"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Title</FieldLabel>
                <FieldInput
                  value={exp.title}
                  onChange={(v) => updateExperience(idx, "title", v)}
                  placeholder="Job title"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Location</FieldLabel>
                <FieldInput
                  value={exp.location}
                  onChange={(v) => updateExperience(idx, "location", v)}
                  placeholder="City, State"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <FieldLabel>Start</FieldLabel>
                  <FieldInput
                    value={exp.startDate}
                    onChange={(v) => updateExperience(idx, "startDate", v)}
                    placeholder="YYYY-MM"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <FieldLabel>End</FieldLabel>
                  <FieldInput
                    value={exp.endDate}
                    onChange={(v) => updateExperience(idx, "endDate", v)}
                    placeholder="Present"
                  />
                </div>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <FieldTextarea
                  value={exp.description}
                  onChange={(v) => updateExperience(idx, "description", v)}
                  placeholder="Key responsibilities and achievements..."
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addExperience}
          className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Add experience
        </button>
      </div>
    );
  }

  function renderEducationSection() {
    return (
      <div className="space-y-4">
        {data.education.map((edu, idx) => (
          <div
            key={edu.id}
            className="rounded-md border border-border/50 bg-background p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Education {idx + 1}
              </span>
              <button
                onClick={() => removeEducation(idx)}
                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove education"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel>School</FieldLabel>
                <FieldInput
                  value={edu.school}
                  onChange={(v) => updateEducation(idx, "school", v)}
                  placeholder="University name"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Degree</FieldLabel>
                <FieldInput
                  value={edu.degree}
                  onChange={(v) => updateEducation(idx, "degree", v)}
                  placeholder="B.S."
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Field of Study</FieldLabel>
                <FieldInput
                  value={edu.field}
                  onChange={(v) => updateEducation(idx, "field", v)}
                  placeholder="Computer Science"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <FieldLabel>Start</FieldLabel>
                  <FieldInput
                    value={edu.startDate}
                    onChange={(v) => updateEducation(idx, "startDate", v)}
                    placeholder="YYYY-MM"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <FieldLabel>End</FieldLabel>
                  <FieldInput
                    value={edu.endDate}
                    onChange={(v) => updateEducation(idx, "endDate", v)}
                    placeholder="YYYY-MM"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <FieldLabel>GPA</FieldLabel>
                <FieldInput
                  value={edu.gpa}
                  onChange={(v) => updateEducation(idx, "gpa", v)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addEducation}
          className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Add education
        </button>
      </div>
    );
  }

  function renderSkills() {
    return (
      <div className="space-y-3">
        {data.skills.map((skill, idx) => (
          <div key={skill.id} className="flex items-start gap-2">
            <div className="grid flex-1 gap-2 sm:grid-cols-3">
              <div className="space-y-1.5">
                <FieldLabel>Category</FieldLabel>
                <FieldInput
                  value={skill.category}
                  onChange={(v) => updateSkill(idx, "category", v)}
                  placeholder="Languages"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel>Skills</FieldLabel>
                <FieldInput
                  value={skill.items}
                  onChange={(v) => updateSkill(idx, "items", v)}
                  placeholder="TypeScript, Python, Rust"
                />
              </div>
            </div>
            <button
              onClick={() => removeSkill(idx)}
              className="mt-6 flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Remove skill category"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button
          onClick={addSkill}
          className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Add skill category
        </button>
      </div>
    );
  }

  function renderProjects() {
    return (
      <div className="space-y-4">
        {data.projects.map((proj, idx) => (
          <div
            key={proj.id}
            className="rounded-md border border-border/50 bg-background p-3 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground">
                Project {idx + 1}
              </span>
              <button
                onClick={() => removeProject(idx)}
                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label="Remove project"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <FieldLabel>Name</FieldLabel>
                <FieldInput
                  value={proj.name}
                  onChange={(v) => updateProject(idx, "name", v)}
                  placeholder="Project name"
                />
              </div>
              <div className="space-y-1.5">
                <FieldLabel>Link</FieldLabel>
                <FieldInput
                  value={proj.link}
                  onChange={(v) => updateProject(idx, "link", v)}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel>Technologies</FieldLabel>
                <FieldInput
                  value={proj.technologies}
                  onChange={(v) => updateProject(idx, "technologies", v)}
                  placeholder="React, TypeScript, ..."
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <FieldLabel>Description</FieldLabel>
                <FieldTextarea
                  value={proj.description}
                  onChange={(v) => updateProject(idx, "description", v)}
                  placeholder="What does this project do?"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={addProject}
          className="flex h-8 items-center gap-1.5 rounded-md border border-dashed border-border px-3 text-xs font-medium text-muted-foreground transition-colors hover:border-accent hover:text-accent"
        >
          <Plus className="h-3.5 w-3.5" />
          Add project
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orderedSections.map((section) => renderSection(section))}
    </div>
  );
}
