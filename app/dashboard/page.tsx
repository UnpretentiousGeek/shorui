import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { DashboardContent } from "@/components/dashboard/dashboard-content";

export const metadata = {
  title: "Dashboard — Shorui",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Fetch resumes with branch count
  const { data: resumes } = await supabase
    .from("resumes")
    .select("*, branches(count)")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  // Get user profile for display name
  const { data: profile } = await supabase
    .from("users")
    .select("full_name")
    .eq("id", user.id)
    .single();

  return (
    <DashboardContent
      resumes={resumes ?? []}
      userEmail={user.email ?? ""}
      userName={profile?.full_name ?? undefined}
    />
  );
}
