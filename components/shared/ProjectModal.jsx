import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import EmbeddedReadme from "./EmbeddedReadme"

const ProjectModal = ({ open, setOpen, project, team }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] dialogHeight !border-none overflow-hidden">
        <div className="aspect-[16/9] absolute w-full">
          <Image src={project.screenshot_url ? project.screenshot_url : '/banner.png'} alt={`Image for ${project.title}`} fill className="object-cover " />

          <div className="w-full h-[50px] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-background " />
        </div>


        <DialogHeader className='flex flex-col mt-[calc(100%/16*9+16px)]'>
          <DialogTitle className='font-medium text-xl tracking-normal'>{project.title}</DialogTitle>
          <p className="text-sm pb-2">{team.country} - {team.team_name}</p>

          <div className="flex gap-2">
            <Link href={project.demo_link} className="w-full" target="_blank">
              <Button className='w-full'>View Demo <ExternalLink /></Button>
            </Link>

            <Link href={project.repo_link} className="w-full" target="_blank">
              <Button className='w-full'>Github Repo <GitHubLogoIcon /></Button>
            </Link>
          </div>
        </DialogHeader>

        <DialogDescription>
          {project.description}
        </DialogDescription>

        <div className="h-[2px] bg-primary" />

        <EmbeddedReadme link={project.readme_link} />
      </DialogContent>
    </Dialog>
  )
}

export default ProjectModal