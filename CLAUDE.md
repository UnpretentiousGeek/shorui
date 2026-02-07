# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Shorui (書類 - Japanese for "documents") is a resume version control system built with Next.js. The concept is Git-like version control for resumes.

## Commands

```bash
pnpm dev      # Start development server on localhost:3000
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## Tech Stack

- **pnpm** as package manager (required for v0 compatibility)
- **Next.js 16** with App Router (no Pages Router)
- **React 19** with TypeScript
- **Tailwind CSS 4** with `tw-animate-css` for animations
- **Supabase** for backend/database/auth — uses `@supabase/ssr` for SSR-safe auth
- **Radix UI** for accessible components
- **Lucide React** for icons
- **class-variance-authority** + **clsx** + **tailwind-merge** for component styling

## Project Structure

```
app/
  page.tsx                       # Landing page (composes landing/* components)
  layout.tsx                     # Root layout with ThemeProvider, Geist fonts, dark mode default
  globals.css                    # Tailwind + OKLCH theme variables (light/dark)
  auth/
    page.tsx                     # Sign-in/sign-up form (client component, Supabase auth)
    error/page.tsx               # Auth error page
    sign-up-success/page.tsx     # Email confirmation prompt
  dashboard/
    page.tsx                     # Server component — fetches resumes from Supabase, guards auth
    actions.ts                   # Server actions: createResume, deleteResume, signOut
components/
  theme-provider.tsx             # Dark/light theme context (localStorage-backed)
  landing/                       # Landing page sections
    navbar.tsx                   # Fixed top nav with sign-in/get-started CTAs
    hero.tsx                     # Hero with terminal preview
    features.tsx                 # Feature cards (Version History, Branching, Diff, Export)
    how-it-works.tsx             # 4-step workflow explanation
    cta.tsx                      # Bottom call-to-action
    footer.tsx                   # Footer
  dashboard/                     # Dashboard UI (all client components)
    dashboard-content.tsx        # Main dashboard layout (sidebar + topbar + resume grid)
    sidebar.tsx                  # Collapsible nav sidebar
    topbar.tsx                   # Search bar, theme toggle, user dropdown
    resume-card.tsx              # Resume card with status dot, branch count, actions menu
    new-resume-dialog.tsx        # Modal dialog for creating a new resume
lib/
  utils.ts                       # cn() helper for className merging
  supabase/
    client.ts                    # Browser Supabase client (createBrowserClient)
    server.ts                    # Server Supabase client (createServerClient + cookies)
    middleware.ts                # Session refresh + /dashboard auth guard
types/
  index.ts                       # TypeScript interfaces: User, Resume, Branch, Commit, Block, Export
middleware.ts                    # Next.js middleware — delegates to lib/supabase/middleware
```

### Dead Code / Cleanup Needed
- `lib/supabase.ts` — Old client using `@supabase/supabase-js` directly. Superseded by `lib/supabase/client.ts` and `lib/supabase/server.ts`. Should be removed.
- `.vscode/settings.json` — Sets all files as read-only (v0 artifact). Should be removed or updated.

## Key Patterns

### Styling
- Use Tailwind CSS classes with the `cn()` helper from `lib/utils.ts` for conditional classes
- CSS variables defined in `app/globals.css` for theming (supports light/dark via `.dark` class)
- Color system uses OKLCH color space
- Accent color is teal (oklch hue 170) — used for interactive elements, terminal prompts, feature icons
- Monospace (`font-mono`) used for git-related UI: branch names, commit hashes, terminal previews
- Components use shadcn/ui-style token classes: `bg-card`, `text-muted-foreground`, `border-border`, etc.

### Supabase
- Uses `@supabase/ssr` (modern SSR pattern, replaces old `auth-helpers-nextjs`)
- **Browser client**: `lib/supabase/client.ts` — use in client components
- **Server client**: `lib/supabase/server.ts` — use in server components and server actions
- **Middleware**: `lib/supabase/middleware.ts` — refreshes auth session on every request, guards `/dashboard`
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Optional: `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` for local dev OAuth redirects

### Auth Flow
- `/auth` — sign-in/sign-up with email+password, GitHub OAuth, Google OAuth
- `/auth/sign-up-success` — email confirmation prompt after sign-up
- `/auth/error` — generic auth error page
- Middleware redirects unauthenticated users from `/dashboard/*` to `/auth`
- Dashboard page also server-side checks auth and redirects

### Theme
- Custom `ThemeProvider` context in `components/theme-provider.tsx`
- Persists to `localStorage` key `shorui-theme`
- Default: dark mode (html has `class="dark"`)
- Toggle via `useTheme()` hook → `toggleTheme()`

### Database Schema (Supabase tables expected)
- `users` — id, email, full_name, created_at, updated_at
- `resumes` — id, user_id, title, created_at, updated_at
- `branches` — id, resume_id, name, description, parent_branch_id, is_main, created_at, updated_at
- `commits` — id, branch_id, message, author_id, created_at
- `blocks` — id, commit_id, parent_id, type, order_index, direction, spacing, padding_*, alignment, content (jsonb), font_*, text_*, created_at, updated_at
- `exports` — id, branch_id, commit_id, format (pdf/docx), file_url, created_at

### Server Actions
- `app/dashboard/actions.ts` contains: `createResume(title)`, `deleteResume(resumeId)`, `signOut()`
- All actions verify auth before operating

### Path Aliases
- `@/*` maps to project root (configured in tsconfig.json)

---


## Builder-Reviewer-Integrator Workflow

For implementing features with high quality, use this three-pass workflow:

### Pass 1: Builder
**Goal**: Implement the feature quickly and functionally

**Prompt template**:
```
[BUILDER MODE]
Implement [feature name].
- Focus on getting it working
- Use the architecture from @code-architect if available
- Don't overthink - just build
- When done, hand off to Reviewer
```

**Guidelines**:
- Write functional code
- Follow project structure
- Use TypeScript properly
- Don't review your own work yet

### Pass 2: Reviewer
**Goal**: Critically review the implementation

**Prompt template**:
```
[REVIEWER MODE]
Review the [feature name] that was just built.

Check for:
- TypeScript errors and type safety
- Logic bugs and edge cases
- Missing error handling and loading states
- Performance issues
- Accessibility (ARIA, keyboard nav)
- Code organization and reusability
- Security issues (auth checks, validation)

Provide specific, actionable feedback with file names and line numbers.
Do NOT make changes - only identify issues.
```

**Output format**:
1. **Critical Issues** (must fix)
2. **Important Issues** (should fix)
3. **Suggestions** (nice to have)

### Pass 3: Integrator
**Goal**: Create the final polished implementation

**Prompt template**:
```
[INTEGRATOR MODE]
Take the Builder's implementation and Reviewer's feedback.
Create the final version that:
- Fixes all critical issues
- Addresses important issues
- Implements valuable suggestions
- Maintains the original feature intent
- Works end-to-end

Then run @build-validator and @verify-app.
```

**Final checklist**:
- [ ] All critical issues fixed
- [ ] Important issues addressed
- [ ] Types are correct
- [ ] Error handling added
- [ ] Loading states implemented
- [ ] Build passes
- [ ] App verified working

### Example Usage
```
You: [BUILDER MODE] Implement the branch tree visualization component

Claude: [builds the feature]

You: [REVIEWER MODE] Review the branch tree component

Claude: [provides detailed feedback]

You: [INTEGRATOR MODE] Create final version with review feedback

Claude: [implements polished version, runs validators]
```

### When to Use This Workflow

**Use for**:
- Complex features (editor, version control)
- User-facing components (dashboard, branch tree)
- Critical functionality (auth, data persistence)

**Skip for**:
- Simple utility functions
- Minor styling tweaks
- Configuration files
- Quick bug fixes

### Shortcut: Two-Pass Workflow

For medium complexity features:
```
[BUILD & REVIEW MODE]
1. Implement [feature]
2. Self-review for issues
3. Refine and fix
4. Run validators
```

This combines Builder and Reviewer into one pass, then Integrator refines.
