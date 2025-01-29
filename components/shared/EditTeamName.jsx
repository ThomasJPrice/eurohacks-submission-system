'use client'

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Pencil } from "lucide-react"
import { changeTeamName } from "@/actions/auth"
import toast from "react-hot-toast"


const EditTeamName = ({ team }) => {
  const [open, setOpen] = useState(false)
  const [teamName, setTeamName] = useState(team.team_name)
  const [loading, setLoading] = useState(false)

  async function handleFormSubmit() {
    setLoading(true)

    try {
      const res = await changeTeamName(team.id, teamName)

      if (res?.ok) {
        toast.success('Team name updated!')
      } else {
        toast.error('An error occured!')
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occured!")
    } finally {
      setOpen(false)
      setLoading(false)
    }
  } 

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium tracking-normal">Change your team name</DialogTitle>
          <DialogDescription>
            Edit your team name which displays on your project.
          </DialogDescription>
        </DialogHeader>
        
        <div>
          <Label>Team name</Label>
          <Input className='mt-2' value={teamName} onChange={(e) => setTeamName(e.target.value)} />

          <Button className='mt-4 w-full' disabled={loading} onClick={handleFormSubmit}>
            {loading ? 'Loading...' : 'Save'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default EditTeamName