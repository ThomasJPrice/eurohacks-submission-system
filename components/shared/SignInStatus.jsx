import { checkAuth } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import EditTeamName from './EditTeamName'
import { Button } from '../ui/button'

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
      <Link className='text-center text-sm mt-2' href={'/sign-in'}>
      <Button>Sign In</Button></Link>
    </div>
  )

  const flag = await getFlag(team.team_code)


  return (
    <div className='flex flex-col items-center'>
      <p className='flex gap-1 items-center'>You are signed in as {team.team_name} <Image src={flag} alt={`Flag for ${team.country}`} width={24} height={18} /> <EditTeamName team={team} /></p>

      <form action={handleSignOut}>
        <Button type='submit' className='text-center text-sm mt-2' href={'/sign-in'}>Sign Out</Button>
      </form>
    </div>
  )
}

export default SignInStatus