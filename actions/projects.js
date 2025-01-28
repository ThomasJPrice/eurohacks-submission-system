'use server'

import { createClient } from "@supabase/supabase-js"
import { checkAuth } from "./auth"

export async function submitProject(formData) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const team = await checkAuth()

  const { data, error } = await supabase
    .from("projects")
    .insert([{ ...formData, team_id: team.id }])

  if (error) {
    throw new Error(error.message)
  }

  return {
    ok: true
  }
}

export async function updateProject(formData) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  const team = await checkAuth()

  const { data, error } = await supabase
    .from("projects")
    .update([{ ...formData, team_id: team.id }])
    .eq("team_id", team.id)

  if (error) {
    throw new Error(error.message)
  }

  return {
    ok: true
  }
}