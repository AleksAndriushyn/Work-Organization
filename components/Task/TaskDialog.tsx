import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Project, Task } from '../../types/types'
import TaskForm from '../forms/TaskForm'

const TaskDialog = ({
  open,
  onClose,
  onSubmit,
  task,
  setTask,
  project,
}: {
  open: boolean
  onClose: Function
  onSubmit: SubmitHandler<FieldValues>
  task: Task | null
  setTask: Function
  project: Project | null
}) => {
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth={true}>
      <DialogTitle>Create Task</DialogTitle>
      <DialogContent>
        <TaskForm
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
