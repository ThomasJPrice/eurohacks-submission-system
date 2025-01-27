'use server'

import { createClient } from "@/utils/supabase/server"

export async function submitProject(formData) {
  const supabase = await createClient()

  const { data: {user:team}} = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from("projects")
    .insert([{...formData, team_id: team.team_code}])

  if (error) {
    throw new Error(error.message)
  }
}