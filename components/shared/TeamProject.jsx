import { checkAuth } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import React from 'react'
import ProjectForm from './ProjectForm'
import { Pencil, Plus } from 'lucide-react'

const TeamProject = async () => {
  const team = await checkAuth()

  const supabase = await createClient()
  const {data: currentProject} = await supabase.from('projects').select('*').eq('team_id', team.id).maybeSingle()
  
  return (
    <div className='container flex flex-col items-center'>
      <h1>Your Project</h1>
      
      {currentProject ? (
        <div>
          {/* <ProjectCard project={currentProject} /> */}
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