"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createResume(title: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  // Create the resume
  const { data: resume, error: resumeError } = await supabase
    .from("resumes")
    .insert({ title, user_id: user.id })
    .select()
    .single();

  if (resumeError) {
    return { error: resumeError.message };
  }

  // Create the default "main" branch
  const { error: branchError } = await supabase.from("branches").insert({
    resume_id: resume.id,
    name: "main",
    description: "Default branch",
    is_main: true,
  });

  if (branchError) {
    return { error: branchError.message };
  }

  revalidatePath("/dashboard");
  return { data: resume };
}

export async function deleteResume(resumeId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Not authenticated" };
  }

  const { error } = await supabase
    .from("resumes")
    .delete()
    .eq("id", resumeId)
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  return { data: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
