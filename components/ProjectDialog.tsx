import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import ProjectForm from './forms/ProjectForm'

const ProjectDialog = ({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean
  onClose: Function
  onSubmit: Function
}) => {
  return (
    <Dialog onClose={() => onClose()} open={open}>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>
        <ProjectForm onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button form={'projectForm'} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectDialog
