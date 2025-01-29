import { checkAuth } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import React from 'react'
import ProjectForm from './ProjectForm'
import { Pencil, Plus } from 'lucide-react'
import ProjectCard from './ProjectCard'

const TeamProject = async () => {
  const team = await checkAuth()

  if (!team) return null

  const supabase = await createClient()
  const { data: currentProject, error } = await supabase
    .from('projects')
    .select('*, teams (team_code, country, team_name)')
    .eq('team_id', team.id)
    .maybeSingle();

  if (error) {
    console.error(error)
  }

  return (
    <div className='container flex flex-col items-center gap-4'>
      <h1>Your Team's Project:</h1>

      {currentProject ? (
        <div>
          <ProjectCard project={currentProject} team={currentProject.teams} />
        </div>
      ) : (
        <p>You haven't shipped your project yet!</p>
      )}

      {currentProject ? (
        <ProjectForm
          title={'Edit Project'}
          icon={<Pencil />}
          type={'edit'}
          project={currentProject}
        />
      ) : (
        <ProjectForm
          title={'Create Project'}
          icon={<Plus />}
          type={'create'}
          project={{}}
        />
      )}
    </div>
  )
}

export default TeamProject