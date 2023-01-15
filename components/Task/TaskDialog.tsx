import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { Project, Task } from '../../types/types'
import TaskForm from '../forms/TaskForm'

const TaskDialog = ({
  open,
  onClose,
  onSubmit,
  task,
  setTask,
  projects,
  project,
}: {
  open: boolean
  onClose: Function
  onSubmit: Function
  task: Task | null
  setTask: Function
  projects: Project[]
  project: Project | null
}) => {
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth={true}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TaskForm
          projects={projects}
          onSubmit={onSubmit}
          task={task}
          setTask={setTask}
          project={project}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button variant={'contained'} form={'task-form'} type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TaskDialog
