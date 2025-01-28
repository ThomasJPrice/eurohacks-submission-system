import { checkAuth } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export async function getFlag(teamCode) {
  return 'https://flagicons.lipis.dev/flags/4x3/' + teamCode.substring(0, 2).toLowerCase() + '.svg'
}

async function handleSignOut() {
  'use server'
  const supabase = await createClient()

  await supabase.auth.signOut()
}

const SignInStatus = async () => {
  const team = await checkAuth()

  if (!team) return (
    <div className='flex flex-col items-center'>
      <p>You are currently not signed in.</p>
      <Link className='text-center text-sm' href={'/sign-in'}>Sign In</Link>
    </div>
  )

  const flag = await getFlag(team.team_code)


  return (
    <div className='flex flex-col items-center'>
      <p className='flex gap-1 items-center'>You are signed in as {team.team_name} <Image src={flag} alt={`Flag for ${team.country}`} width={24} height={18} /></p>

      <form action={handleSignOut}>
        <button type='submit' className='text-center text-sm' href={'/sign-in'}>Sign Out</button>
      </form>
    </div>
  )
}

export default SignInStatus