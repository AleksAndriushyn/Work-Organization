import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import { MouseEventHandler, useState } from 'react'
import { saveData } from '../../lib/api'
import { Status, Task } from '../../types/types'
import { TaskInfoContent } from '../home-page/TaskInfoContent'

const TaskInfoModal = ({
  open,
  onClose,
  task,
  setTask,
  tasks,
  setTasks,
}: {
  open: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  task: Task | null
  setTask: Function
  tasks: Task[]
  setTasks: Function
}) => {
  const [isEditing, setIsEditing] = useState({
    isNameEditing: false,
    isAssigneeEditing: false,
    isDescEditing: false,
  })

  const saveToDatabase = async (status?: Status) => {
    if (!task) return
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? (status ? { ...t, status } : task) : t
    )

    setTasks(updatedTasks)
    const updTask = updatedTasks.find((el) => el.id === task.id)
    await saveData(updTask, 'task/createTask')
  }

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth={'md'}
      disableEscapeKeyDown
    >
      <DialogTitle>Task Info</DialogTitle>
      <DialogContent>
        <TaskInfoContent
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          saveToDatabase={saveToDatabase}
          task={task}
          setTask={setTask}
          tasks={tasks}
          setTasks={setTasks}
        />
      </DialogContent>
    </Dialog>
  )
}

export default TaskInfoModal
