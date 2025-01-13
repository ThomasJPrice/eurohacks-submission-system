import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Use Service Role for admin access
);

export async function POST(request) {
  const { teamCode, pin } = await request.json();

  console.log(teamCode, pin);
  

  // Validate team code and PIN
  const { data: team, error } = await supabase
    .from('teams')
    .select('*')
    .eq('team_code', teamCode)
    .eq('pin', pin)
    .maybeSingle();

  if (error || !team) {
    console.log(error, team);
    return NextResponse.json({ error: 'Invalid team code or PIN' }, { status: 401 });
  }
  const { data, error: signInError } = await supabase.auth.signInAnonymously({
    options: {
      data: {
        team_id: team.id,
      }
    }
  })

  if (signInError) {
    console.log(signInError);
    return NextResponse.json({ error: 'Failed to sign in' }, { status: 500 });
  }

  // Return the token
  return NextResponse.json({ data });
}
