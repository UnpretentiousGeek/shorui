export interface ResumeSection {
  id: string;
  type: "personal" | "experience" | "education" | "skills" | "projects";
  title: string;
  collapsed: boolean;
}

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface SkillCategory {
  id: string;
  category: string;
  items: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
}

export interface MockBranch {
  id: string;
  name: string;
  isMain: boolean;
  parentId: string | null;
  createdAt: string;
}

export interface MockCommit {
  id: string;
  hash: string;
  message: string;
  author: string;
  branchName: string;
  timestamp: string;
}

export const mockResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Chen",
    email: "alex.chen@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    summary:
      "Full-stack engineer with 5+ years of experience building scalable web applications. Passionate about developer tools, design systems, and open source.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Vercel",
      title: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      description:
        "Led development of the edge middleware platform. Built real-time collaboration features for the dashboard. Improved CI/CD pipeline reducing deploy times by 40%.",
    },
    {
      id: "exp-2",
      company: "Stripe",
      title: "Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "2022-12",
      description:
        "Developed payment processing APIs handling $10B+ in transactions. Built internal tooling for fraud detection. Mentored 3 junior engineers.",
    },
    {
      id: "exp-3",
      company: "GitHub",
      title: "Junior Developer",
      location: "Remote",
      startDate: "2018-09",
      endDate: "2020-05",
      description:
        "Contributed to the Pull Request review system. Built GitHub Actions workflow templates. Maintained open-source CLI tools.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "B.S.",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-06",
      gpa: "3.8",
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: "Languages",
      items: "TypeScript, Python, Rust, Go, SQL",
    },
    {
      id: "skill-2",
      category: "Frameworks",
      items: "React, Next.js, Node.js, FastAPI, Tailwind CSS",
    },
    {
      id: "skill-3",
      category: "Tools",
      items: "Git, Docker, Kubernetes, AWS, Vercel, PostgreSQL, Redis",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Shorui",
      description:
        "Git-like version control system for resumes. Branch, commit, and diff your resume versions.",
      technologies: "Next.js, TypeScript, Supabase, Tailwind CSS",
      link: "https://github.com/alexchen/shorui",
    },
    {
      id: "proj-2",
      name: "DevTerminal",
      description:
        "A web-based terminal emulator with AI-powered command suggestions and auto-completion.",
      technologies: "React, WebSockets, OpenAI API, xterm.js",
      link: "https://github.com/alexchen/devterminal",
    },
  ],
};

export const mockBranches: MockBranch[] = [
  {
    id: "br-1",
    name: "main",
    isMain: true,
    parentId: null,
    createdAt: "2025-12-01T10:00:00Z",
  },
  {
    id: "br-2",
    name: "google-swe",
    isMain: false,
    parentId: "br-1",
    createdAt: "2025-12-15T14:30:00Z",
  },
  {
    id: "br-3",
    name: "startup-fullstack",
    isMain: false,
    parentId: "br-1",
    createdAt: "2026-01-05T09:00:00Z",
  },
  {
    id: "br-4",
    name: "meta-frontend",
    isMain: false,
    parentId: "br-2",
    createdAt: "2026-01-20T16:45:00Z",
  },
];

export const mockCommits: MockCommit[] = [
  {
    id: "c-1",
    hash: "a1b2c3d",
    message: "Initial resume setup",
    author: "Alex Chen",
    branchName: "main",
    timestamp: "2025-12-01T10:05:00Z",
  },
  {
    id: "c-2",
    hash: "e4f5g6h",
    message: "Add work experience section",
    author: "Alex Chen",
    branchName: "main",
    timestamp: "2025-12-02T11:30:00Z",
  },
  {
    id: "c-3",
    hash: "i7j8k9l",
    message: "Add education and skills",
    author: "Alex Chen",
    branchName: "main",
    timestamp: "2025-12-03T09:15:00Z",
  },
  {
    id: "c-4",
    hash: "m0n1o2p",
    message: "Tailor summary for Google SWE role",
    author: "Alex Chen",
    branchName: "google-swe",
    timestamp: "2025-12-15T14:45:00Z",
  },
  {
    id: "c-5",
    hash: "q3r4s5t",
    message: "Emphasize systems design experience",
    author: "Alex Chen",
    branchName: "google-swe",
    timestamp: "2025-12-16T10:00:00Z",
  },
  {
    id: "c-6",
    hash: "u6v7w8x",
    message: "Add Shorui project, highlight full-stack",
    author: "Alex Chen",
    branchName: "startup-fullstack",
    timestamp: "2026-01-05T09:30:00Z",
  },
  {
    id: "c-7",
    hash: "y9z0a1b",
    message: "Focus on React and frontend architecture",
    author: "Alex Chen",
    branchName: "meta-frontend",
    timestamp: "2026-01-20T17:00:00Z",
  },
  {
    id: "c-8",
    hash: "c2d3e4f",
    message: "Update contact info and website",
    author: "Alex Chen",
    branchName: "main",
    timestamp: "2026-01-25T08:00:00Z",
  },
];

// Alternate resume data for diff comparison
export const mockResumeDataV2: ResumeData = {
  personalInfo: {
    fullName: "Alex Chen",
    email: "alex@alexchen.dev",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://alexchen.dev",
    summary:
      "Senior full-stack engineer with 5+ years building scalable distributed systems and developer tools. Led teams at Vercel and Stripe. Passionate about open source and DX.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Vercel",
      title: "Staff Software Engineer",
      location: "San Francisco, CA",
      startDate: "2023-01",
      endDate: "Present",
      description:
        "Led development of the edge middleware platform serving 100M+ requests/day. Built real-time collaboration features for the dashboard. Architected the new deployment pipeline reducing build times by 60%.",
    },
    {
      id: "exp-2",
      company: "Stripe",
      title: "Software Engineer II",
      location: "San Francisco, CA",
      startDate: "2020-06",
      endDate: "2022-12",
      description:
        "Developed payment processing APIs handling $10B+ in transactions. Built internal tooling for fraud detection. Mentored 3 junior engineers and led the intern program.",
    },
    {
      id: "exp-3",
      company: "GitHub",
      title: "Software Engineer",
      location: "Remote",
      startDate: "2018-09",
      endDate: "2020-05",
      description:
        "Contributed to the Pull Request review system used by 80M+ developers. Built GitHub Actions workflow templates. Maintained open-source CLI tools.",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "B.S.",
      field: "Computer Science",
      startDate: "2014-09",
      endDate: "2018-06",
      gpa: "3.8",
    },
  ],
  skills: [
    {
      id: "skill-1",
      category: "Languages",
      items: "TypeScript, Python, Rust, Go, SQL, C++",
    },
    {
      id: "skill-2",
      category: "Frameworks",
      items: "React, Next.js, Node.js, FastAPI, Tailwind CSS, tRPC",
    },
    {
      id: "skill-3",
      category: "Infrastructure",
      items: "Git, Docker, Kubernetes, AWS, Vercel, PostgreSQL, Redis, Kafka",
    },
  ],
  projects: [
    {
      id: "proj-1",
      name: "Shorui",
      description:
        "Git-like version control for resumes. Branch for different applications, commit changes, and diff versions.",
      technologies: "Next.js, TypeScript, Supabase, Tailwind CSS",
      link: "https://github.com/alexchen/shorui",
    },
    {
      id: "proj-2",
      name: "DevTerminal",
      description:
        "Web-based terminal with AI-powered suggestions, auto-completion, and collaborative sessions.",
      technologies: "React, WebSockets, OpenAI API, xterm.js",
      link: "https://github.com/alexchen/devterminal",
    },
  ],
};
