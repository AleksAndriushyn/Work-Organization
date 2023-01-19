import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { SubmitHandler, FieldValues } from 'react-hook-form'
import { Project } from '../../types/types'
import ProjectForm from '../forms/ProjectForm'

const ProjectDialog = ({
  open,
  onClose,
  onSubmit,
  project,
  setTask: setProject,
}: {
  open: boolean
  onClose: Function
  onSubmit: SubmitHandler<FieldValues>
  project: Project | null
  setTask: Function
}) => {
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth={true}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <ProjectForm
          onSubmit={onSubmit}
          project={project}
          setProject={setProject}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button variant={'contained'} form={'project-form'} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectDialog
