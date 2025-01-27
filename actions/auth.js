'use server'

import { createClient } from '@supabase/supabase-js';
import { createClient as createServerClient } from '@/utils/supabase/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for admin access
);

export async function login(teamCode, pin) {
  const supabaseServer = await createServerClient()

  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('team_code', teamCode)
    .eq('pin', pin)
    .maybeSingle();

  if (error || !team) {
    console.log(error);
    
    return { error: 'Invalid team code or PIN' }
  }
  const { data, error: signInError } = await supabaseServer.auth.signInAnonymously({
    options: {
      data: {
        team_id: team.id,
      }
    }
  })

  if (signInError) {
    return { error: 'Failed to sign in' }
  }

  return { data }
}


export async function loginWithNFC(cardId) {
  const [teamCode, pin] = cardId.split('-');

  console.log(teamCode, pin);
  

  const data = await login(teamCode, pin);

  return data;
}



export async function checkAuth() {
  const supabaseServer = await createServerClient()
  const { data: { user }, error } = await supabaseServer.auth.getUser()

  if (!user || error) return false
  
  const {data: team, error: teamError } = await supabase
    .from('teams')
    .select('*')
    .eq('id', user.user_metadata.team_id)
    .maybeSingle()

  if (!team || teamError) return false

  return team
}