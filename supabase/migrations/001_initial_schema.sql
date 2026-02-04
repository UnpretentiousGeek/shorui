-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Resumes table (base resume per user)
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'My Resume',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Branches table (resume variants)
CREATE TABLE public.branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resume_id UUID REFERENCES public.resumes(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  parent_branch_id UUID REFERENCES public.branches(id) ON DELETE SET NULL,
  is_main BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(resume_id, name)
);

-- Commits table (version snapshots)
CREATE TABLE public.commits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  author_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blocks table (resume content blocks)
CREATE TABLE public.blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  commit_id UUID REFERENCES public.commits(id) ON DELETE CASCADE NOT NULL,
  parent_id UUID REFERENCES public.blocks(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  
  -- Layout properties (Figma-like auto-layout)
  direction TEXT DEFAULT 'vertical',
  spacing INTEGER DEFAULT 16,
  padding_top INTEGER DEFAULT 0,
  padding_right INTEGER DEFAULT 0,
  padding_bottom INTEGER DEFAULT 0,
  padding_left INTEGER DEFAULT 0,
  alignment TEXT DEFAULT 'start',
  
  -- Content (JSONB for flexibility)
  content JSONB DEFAULT '{}',
  
  -- Text styling
  font_family TEXT,
  font_size INTEGER,
  font_weight TEXT,
  text_color TEXT,
  text_align TEXT,
  text_decoration TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Exports table
CREATE TABLE public.exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE NOT NULL,
  commit_id UUID REFERENCES public.commits(id) ON DELETE CASCADE NOT NULL,
  format TEXT NOT NULL,
  file_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exports ENABLE ROW LEVEL SECURITY;
