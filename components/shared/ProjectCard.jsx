'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "../ui/card"
import { MapPin } from "lucide-react"
import ProjectModal from "./ProjectModal"

const ProjectCard = ({ project }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Card
        className="flex flex-col mx-auto cursor-pointer w-full max-w-md rounded-md overflow-hidden"
        onClick={() => setOpen(true)}
      >
        {/* Image Section */}
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={project.screenshot_url || "/placeholder.svg?height=200&width=400"}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Card Content */}
        <CardContent className="p-4">
          <h3 className="text-xl font-medium text-[#D97A4A] mb-1 line-clamp-1">{project.title}</h3>
          <p className="text-sm mt-2 line-clamp-2 overflow-hidden text-ellipsis">{project.description}</p>
        </CardContent>

        {/* Card Footer */}
        <CardFooter className="px-4 py-3 bg-primary flex items-center justify-between">
          <div className="flex items-center text-xs">
            <MapPin className="w-4 h-4 mr-1" />
            United Kingdom
          </div>
          <div className="text-sm font-medium">Test Team</div>
        </CardFooter>
      </Card>


      <ProjectModal open={open} setOpen={setOpen} project={project} />
    </>
  )
}

export default ProjectCard