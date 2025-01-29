import { checkAuth } from '@/actions/auth'
import { createClient } from '@/utils/supabase/server'
import React from 'react'
import ProjectCard from './ProjectCard'

const ProjectsSection = async () => {
  const team = await checkAuth()

  const supabase = await createClient()

  let query = supabase.from('projects').select('*').select('*, teams (team_code, country, team_name)')

  if (team?.id) {
    query = query.neq('team_id', team.id); // Only apply this filter if team.id exists
  }

  const { data: projects, error } = await query;


  if (error) {
    console.error(error)
  }

  return (
    <section id='projects' className='container'>
      <h2 className='text-2xl text-[#D97A4A] text-center font-medium'>All Projects</h2>

      <div className='grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3'>
        {projects.map((project) => (
          <ProjectCard project={project} team={project.teams} key={project.id} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection