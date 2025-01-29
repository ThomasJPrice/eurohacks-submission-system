'use client'

import { useEffect, useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Label } from "../ui/label"

function getRawReadmeUrl(repoUrl, branch = "main") {
  try {
    const urlPattern = /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)(\/.*)?$/;
    const match = repoUrl.match(urlPattern);

    if (!match) {
      throw new Error("Invalid GitHub repository URL.");
    }

    const username = match[1];
    const repoName = match[2];

    return `https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`;
  } catch (error) {
    // console.error(error.message);
    return "";
  }
}

import { GitHubLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { submitProject, updateProject } from "@/actions/projects"
import toast from "react-hot-toast"
import confetti from "canvas-confetti"

const ProjectForm = ({ title, icon, type, project }) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: project.title || "",
    description: project.description || "",
    demo_link: project.demo_link || "",
    repo_link: project.repo_link || "",
    readme_link: project.readme_link || "",
    screenshot_url: project.screenshot_url || "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (formData.repo_link) {
      const readmeUrl = getRawReadmeUrl(formData.repo_link)
      setFormData((prev) => ({ ...prev, readme_link: readmeUrl }))
    }
  }, [formData.repo_link])

  async function handleFormSubmit() {
    setLoading(true)

    try {
      if (type === "edit") {
        const res = await updateProject(formData)
        if (res?.ok) {
          toast.success('Project updated!')
          confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.4 },
          })
        }
      } else {
        const res = await submitProject(formData)
        if (res?.ok) {
          toast.success('Project submitted!')
          confetti({
            particleCount: 100,
            spread: 100,
            origin: { y: 0.4 },
          })
        }
      }
    } catch (error) {
      console.log(error);
      
      toast.error("An error occured!")
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{icon} {title}</Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl dialogHeight !border-none overflow-hidden">
        <div className="aspect-[16/9] absolute w-full">
          <Image src={formData.screenshot_url ? formData.screenshot_url : '/banner.png'} alt={`Image for ${formData.title}`} fill className="object-cover " />

          <div className="w-full h-[50px] absolute bottom-0 left-0 bg-gradient-to-b from-transparent to-background " />
        </div>

        <DialogHeader className='flex flex-col mt-[calc(100%/16*9+16px)]'>
          <DialogTitle className='font-medium text-xl tracking-normal'>{type === 'edit' ? `Edit "${project.title}"` : title}</DialogTitle>
          <p className="text-sm">All fields are required for a good project submission.</p>
        </DialogHeader>


        <div className="space-y-4">
          {/* TITLE */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleInputChange} required />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* DEMO LINK */}
          <div className="space-y-2">
            <Label htmlFor="demo_link">Demo Link</Label>
            <Input id="demo_link" name="demo_link" value={formData.demo_link} onChange={handleInputChange} type="url" />
          </div>

          {/* REPO LINK */}
          <div className="space-y-2">
            <Label htmlFor="repo_link">Repository Link</Label>
            <div className="relative">
              <Input
                id="repo_link"
                name="repo_link"
                value={formData.repo_link}
                onChange={handleInputChange}
                type="url"
                className="pr-10"
              />
              <GitHubLogoIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* README LINK */}
          <div className="space-y-2">
            <Label htmlFor="repo_link">README Link</Label>
            <div className="relative">
              <Input
                id="readme_link"
                name="readme_link"
                value={formData.readme_link}
                onChange={handleInputChange}
                type="url"
              />
            </div>
          </div>

          {/* SCREENSHOT URL */}
          <div className="space-y-2">
            <Label htmlFor="screenshot_url">Screenshot URL (you can use Hack Club's <Link href='https://hackclub.slack.com/archives/C016DEDUL87' className="underline" target="_blank">#cdn</Link> slack channel!)</Label>
            <Input
              id="screenshot_url"
              name="screenshot_url"
              value={formData.screenshot_url}
              onChange={handleInputChange}
              type="url"
            />
          </div>

          <DialogFooter>
            <Button onClick={() => handleFormSubmit()} className='w-full' disabled={loading}>
              {loading ? 'Loading...' : `${type === 'edit' ? 'Update' : 'Submit'} Project`}
            </Button>
          </DialogFooter>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default ProjectForm