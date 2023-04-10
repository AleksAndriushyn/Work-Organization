import { Task } from '../types/types'

export const handleOutFocus = async (
  text: string,
  key: string,
  tasks: Task[] | undefined,
  task: Task | null,
  setIsEditing: Function,
  setTask: Function,
  saveData: any
) => {
  let prevTask
  const founded = tasks?.find((el) => el.id === task?.id)
  if (founded) prevTask = founded[key as keyof Task] as string

  if (task && text && prevTask?.trim() !== text.trim()) {
    task[key as keyof Task] = text
    setTask(task)
    saveData()
  }
  setIsEditing((prevState: any) => ({
    ...prevState,
    isDescEditing: false,
    isNameEditing: false,
  }))
}
