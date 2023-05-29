import AddIcon from '@mui/icons-material/Add'
import { Box, Button, InputLabel, Typography } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { handleOutFocus } from '../../../lib/service'
import { getRandomUsers } from '../../../lib/users'
import { Comment, Project, Status, Task, User } from '../../../types/types'
import { CustomTextField } from '../../custom-components/CustomTextField'
import { AccordionInfo } from './AccordionInfo'
import { Comments } from './Comments'
import { DrawerComponent } from './DrawerComponent'
import { ProgressPopper } from './ProgressPopper'

const Content = ({
  activeTask,
  setActiveTask,
  project,
  setIsOpen,
  onSubmit,
  activeTaskIndex,
  setActiveTaskIndex,
  setProject,
}: {
  activeTask: Task | null
  project: Project
  setIsOpen: Function
  setActiveTask: Function
  onSubmit: Function
  activeTaskIndex: number
  setActiveTaskIndex: Function
  setProject: Function
}) => {
  const [isEditing, setIsEditing] = useState({
    isNameEditing: false,
    isAssigneeEditing: false,
    isDescEditing: false,
  })
  const [users, setUsers] = useState<User[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const comments = (activeTask?.comments as Comment[]) ?? []
  const activeStatus = (activeTask?.status as Status) ?? {
    label: '',
    value: '',
  }
  const assignee = (activeTask?.assignee as User) ?? {
    id: '',
    name: '',
    image: '',
    email: '',
    tasks: [],
  }
  const reporter = (activeTask?.reporter as User) ?? {
    id: '',
    name: '',
    image: '',
    email: '',
    tasks: [],
  }
  const menuOpen = Boolean(anchorEl)
  const id = menuOpen ? 'user-popper' : undefined

  const [expanded, setExpanded] = useState(false)
  const [removedStatus, setRemovedStatus] = useState<Status | null>(
    activeStatus
  )
  const [statuses, setStatuses] = useState<Status[]>([
    { label: 'To Do', value: 'to-do' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const onKeyDown = (event: any) => {
    if (event.key === 'Escape') {
      event.target.blur()
    }
  }

  const onKeyDownAssignee = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      const prevAssigneeInd = project.tasks?.findIndex(
        (el: Task) => (el.assignee as User).id === assignee.id
      )
      isEditing.isAssigneeEditing && prevAssigneeInd === -1 && onSubmit()
      setIsEditing((prevState) => ({
        ...prevState,
        isAssigneeEditing: false,
      }))
    }
  }

  useEffect(() => {
    ;(async () => {
      setUsers((await getRandomUsers()) as User[])
    })()
  }, [activeTask?.id])

  useEffect(() => {
    if (removedStatus) statuses.push(removedStatus)
    setRemovedStatus(activeStatus)
    setStatuses(statuses.filter((el) => el.value !== activeStatus?.value))
    setAnchorEl(null)
    setExpanded(false)
  }, [activeTask?.id])

  return (
    <Box
      style={{
        display: 'flex',
        gap: '15rem',
      }}
    >
      <Box sx={{ zIndex: 0, width: '100px' }}>
        <DrawerComponent
          activeTaskIndex={activeTaskIndex}
          setActiveTaskIndex={setActiveTaskIndex}
          setActiveTask={setActiveTask}
          tasks={project.tasks ?? []}
          projectName={project.name}
          setProject={setProject}
        />
      </Box>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          marginTop: '5rem',
        }}
      >
        <Box>
          <Button
            variant="contained"
            style={{ margin: '3em', float: 'right' }}
            startIcon={<AddIcon />}
            onClick={() => setIsOpen(true)}
          >
            Create task
          </Button>
        </Box>
        {project?.tasks?.length ? (
          <Box
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '3em',
              }}
            >
              <Box
                style={{
                  width: '30em',
                }}
              >
                <CustomTextField
                  isEditing={isEditing.isNameEditing}
                  setIsEditing={() =>
                    setIsEditing((prevState) => ({
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
                      project?.tasks,
                      activeTask,
                      setIsEditing,
                      setActiveTask,
                      onSubmit
                    )
                  }
                  onKeyDown={onKeyDown}
                  onChange={(
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) =>
                    setActiveTask((prevState: Task) => ({
                      ...prevState,
                      name: event.target.value,
                    }))
                  }
                  value={activeTask?.name as string}
                  style={{
                    fontWeight: 'bold',
                    fontSize: '24px',
                  }}
                />
              </Box>
              <Box style={{ width: '40em' }}>
                <InputLabel>
                  <b>Description:</b>
                </InputLabel>
                <CustomTextField
                  isEditing={isEditing.isDescEditing}
                  setIsEditing={() =>
                    setIsEditing((prevState) => ({
                      ...prevState,
                      isDescEditing: true,
                    }))
                  }
                  placeholder={'Add description here...'}
                  onChange={(
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) =>
                    setActiveTask((prevState: Task) => ({
                      ...prevState,
                      description: event.target.value,
                    }))
                  }
                  handleOutFocus={(
                    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) =>
                    handleOutFocus(
                      event.target.value,
                      'description',
                      project?.tasks,
                      activeTask,
                      setIsEditing,
                      setActiveTask,
                      onSubmit
                    )
                  }
                  onKeyDown={onKeyDown}
                  value={activeTask?.description as string}
                />
              </Box>
              <Box
                style={{
                  width: '40em',
                }}
              >
                <Comments
                  comments={comments}
                  activeTask={activeTask}
                  setActiveTask={setActiveTask}
                  project={project}
                  setProject={setProject}
                />
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
              join={Object.keys(activeTask as Task)
                .filter(
                  (el) =>
                    el === 'assignee' || el === 'reporter' || el === 'status'
                )
                .join(', ')}
              setActiveTask={setActiveTask}
            />
          </Box>
        ) : (
          <Typography style={{ textAlign: 'center' }}>
            No tasks available
          </Typography>
        )}
      </Box>
      <ProgressPopper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        menuOpen={menuOpen}
        id={id}
        removedStatus={removedStatus}
        setRemovedStatus={setRemovedStatus}
        statuses={statuses}
        setStatuses={setStatuses}
        activeTask={activeTask}
        setActiveTask={setActiveTask}
        project={project}
        saveData={onSubmit}
      />
    </Box>
  )
}

export default Content
