import { Box, InputLabel } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { handleOutFocus } from '../../lib/service'
import { getRandomUsers } from '../../lib/users'
import { Comment, Status, Task, User } from '../../types/types'
import { AccordionInfo } from '../Task/task-page/AccordionInfo'
import { Comments } from '../Task/task-page/Comments'
import { ProgressPopper } from '../Task/task-page/ProgressPopper'
import { CustomTextField } from '../custom-components/CustomTextField'

export const TaskInfoContent = ({
  isEditing,
  setIsEditing,
  saveToDatabase,
  task,
  setTask,
  tasks,
  setTasks,
}: {
  isEditing: any
  setIsEditing: Function
  saveToDatabase: Function
  task: Task | null
  setTask: Function
  tasks: Task[]
  setTasks: Function
}) => {
  const [expanded, setExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [users, setUsers] = useState<User[]>([])
  const [statuses, setStatuses] = useState<Status[]>([
    { label: 'To Do', value: 'to-do' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ])
  const activeStatus = task?.status as Status
  const [removedStatus, setRemovedStatus] = useState<Status | null>(
    activeStatus
  )
  const assignee = task?.assignee as User
  const reporter = task?.reporter as User
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  const menuOpen = Boolean(anchorEl)
  const id = menuOpen ? 'user-popper' : undefined

  useEffect(() => {
    if (removedStatus) statuses.push(removedStatus)
    setRemovedStatus(activeStatus)
    setStatuses(statuses.filter((el) => el.value !== activeStatus?.value))
    setAnchorEl(null)
    setExpanded(false)
  }, [task?.id])

  useEffect(() => {
    const fetchUsers = async () => {
      setUsers((await getRandomUsers()) as User[])
    }
    fetchUsers()
  }, [task?.id])

  const onKeyDownAssignee = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      const prevAssigneeInd = tasks?.findIndex(
        (el: Task) => (el.assignee as User).id === assignee.id
      )
      isEditing.isAssigneeEditing && prevAssigneeInd === -1 && saveToDatabase()
      setIsEditing((prevState: any) => ({
        ...prevState,
        isAssigneeEditing: false,
      }))
    }
  }
  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '50%',
          gap: '1rem',
          overflow: 'auto',
          height: '390px',
        }}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <Box>
            <InputLabel>
              <b>Summary:</b>
            </InputLabel>
            <CustomTextField
              setIsEditing={() =>
                setIsEditing((prevState: any) => ({
                  ...prevState,
                  isNameEditing: true,
                }))
              }
              handleOutFocus={(
                event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) =>
                handleOutFocus(
                  event.target.value,
                  'name',
                  tasks,
                  task,
                  setIsEditing,
                  setTask,
                  saveToDatabase
                )
              }
              isEditing={isEditing.isNameEditing}
              onChange={(
                event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
              ) => {
                setTask((prevState: Task) => ({
                  ...prevState,
                  name: event.target.value,
                }))
              }}
              value={task?.name ?? ''}
            />
          </Box>
          <Box>
            <InputLabel>
              <b>Description:</b>
            </InputLabel>
            <CustomTextField
              setIsEditing={() =>
                setIsEditing((prevState: any) => ({
                  ...prevState,
                  isDescEditing: true,
                }))
              }
              handleOutFocus={(
                event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) =>
                handleOutFocus(
                  event.target.value,
                  'description',
                  tasks,
                  task,
                  setIsEditing,
                  setTask,
                  saveToDatabase
                )
              }
              isEditing={isEditing.isDescEditing}
              onChange={(
                event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) =>
                setTask((prevState: Task) => ({
                  ...prevState,
                  description: event.target.value,
                }))
              }
              value={task?.description ?? ''}
            />
          </Box>
          <Box>
            <Comments
              comments={task?.comments as Comment[]}
              activeTask={task}
              setActiveTask={setTask}
              tasks={tasks}
              setTasks={setTasks}
            />
          </Box>
        </Box>
      </Box>
      <AccordionInfo
        isAssigneeEditing={isEditing.isAssigneeEditing}
        setIsEditing={setIsEditing}
        users={users}
        activeStatus={activeStatus}
        assignee={assignee}
        reporter={reporter}
        expanded={expanded}
        setExpanded={setExpanded}
        handleClick={handleClick}
        onKeyDownAssignee={onKeyDownAssignee}
        join={Object.keys(task as Task)
          .filter(
            (el) => el === 'assignee' || el === 'reporter' || el === 'status'
          )
          .join(', ')}
        setActiveTask={setTask}
      />
      <ProgressPopper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        menuOpen={menuOpen}
        id={id}
        removedStatus={removedStatus}
        setRemovedStatus={setRemovedStatus}
        statuses={statuses}
        setStatuses={setStatuses}
        activeTask={task}
        setActiveTask={setTask}
        saveData={saveToDatabase}
      />
    </Box>
  )
}
