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
- **Supabase** for backend/database/auth
- **Radix UI** for accessible components
- **Lucide React** for icons

## Project Structure

```
app/           # Next.js App Router pages and layouts
lib/           # Utilities and configuration
  utils.ts     # cn() helper for className merging
  supabase.ts  # Supabase client initialization
```

## Key Patterns

### Styling
- Use Tailwind CSS classes with the `cn()` helper from `lib/utils.ts` for conditional classes
- CSS variables defined in `app/globals.css` for theming (supports light/dark via `.dark` class)
- Color system uses OKLCH color space

### Supabase
- Client initialized in `lib/supabase.ts`
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Uses `@supabase/auth-helpers-nextjs` for Next.js integration

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
