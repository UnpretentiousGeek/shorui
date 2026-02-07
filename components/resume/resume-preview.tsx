"use client";

import type { ResumeData } from "@/lib/mock-data";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  ExternalLink,
} from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const p = data.personalInfo;

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-8 shadow-sm">
      {/* Header */}
      <div className="border-b border-border pb-4 mb-5">
        <h1 className="text-2xl font-bold text-foreground">{p.fullName || "Your Name"}</h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {p.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {p.email}
            </span>
          )}
          {p.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              {p.phone}
            </span>
          )}
          {p.location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {p.location}
            </span>
          )}
          {p.website && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" />
              {p.website}
            </span>
          )}
        </div>
        {p.summary && (
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            {p.summary}
          </p>
        )}
      </div>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Experience
          </h2>
          <div className="space-y-4">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {exp.title || "Job Title"}
                    </span>
                    {exp.company && (
                      <span className="text-sm text-muted-foreground">
                        {" at "}
                        {exp.company}
                      </span>
                    )}
                  </div>
                  {(exp.startDate || exp.endDate) && (
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {exp.startDate} -- {exp.endDate}
                    </span>
                  )}
                </div>
                {exp.location && (
                  <p className="text-xs text-muted-foreground">{exp.location}</p>
                )}
                {exp.description && (
                  <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Education
          </h2>
          <div className="space-y-3">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <div>
                    <span className="text-sm font-semibold text-foreground">
                      {edu.school || "School Name"}
                    </span>
                    {(edu.degree || edu.field) && (
                      <span className="text-sm text-muted-foreground">
                        {" -- "}
                        {[edu.degree, edu.field].filter(Boolean).join(" in ")}
                      </span>
                    )}
                  </div>
                  {(edu.startDate || edu.endDate) && (
                    <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
                      {edu.startDate} -- {edu.endDate}
                    </span>
                  )}
                </div>
                {edu.gpa && (
                  <p className="text-xs text-muted-foreground">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section className="mb-5">
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Skills
          </h2>
          <div className="space-y-1.5">
            {data.skills.map((skill) => (
              <div key={skill.id} className="text-xs">
                <span className="font-semibold text-foreground">
                  {skill.category || "Category"}:
                </span>{" "}
                <span className="text-foreground/80">
                  {skill.items || "Skills..."}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Projects
          </h2>
          <div className="space-y-3">
            {data.projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">
                    {proj.name || "Project Name"}
                  </span>
                  {proj.link && (
                    <ExternalLink className="h-3 w-3 text-accent" />
                  )}
                </div>
                {proj.technologies && (
                  <p className="font-mono text-[11px] text-accent">
                    {proj.technologies}
                  </p>
                )}
                {proj.description && (
                  <p className="mt-0.5 text-xs leading-relaxed text-foreground/80">
                    {proj.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
