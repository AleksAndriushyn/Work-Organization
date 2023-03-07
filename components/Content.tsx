import AddIcon from '@mui/icons-material/Add'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Popper,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { getRandomUsers } from '../lib/users'
import { TaskStyles } from '../styled-components/global.styled'
import { Project, Status, Task, Type, User } from '../types/types'
import { showProgress } from './CustomLinearProgress'
import { CustomTextField } from './CustomTextField'
import { DrawerComponent } from './DrawerComponent'
import RenderUser from './RenderUser'
import showIcon from './showIcon'

const Content = ({
  activeTask,
  setActiveTask,
  project,
  setIsOpen,
  onSubmit,
  activeTaskIndex,
  setActiveTaskIndex,
}: {
  activeTask: Task | null
  project: Project
  setIsOpen: Function
  setActiveTask: Function
  onSubmit: Function
  activeTaskIndex: number
  setActiveTaskIndex: Function
}) => {
  const [isEditing, setIsEditing] = useState({
    isNameEditing: false,
    isAssigneeEditing: false,
    isDescEditing: false,
  })
  const [users, setUsers] = useState<User[]>([])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const activeStatus = activeTask?.status as Status
  const assignee = activeTask?.assignee as User
  const reporter = activeTask?.reporter as User
  const menuOpen = Boolean(anchorEl)
  const id = menuOpen ? 'user-popper' : undefined
  const [removedStatus, setRemovedStatus] = useState<Status | null>(
    activeStatus
  )

  const [expanded, setExpanded] = useState(false)
  const [statuses, setStatuses] = useState<Status[]>([
    { label: 'To Do', value: 'to-do' },
    { label: 'In Progress', value: 'in-progress' },
    { label: 'Done', value: 'done' },
  ])

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const handleOutFocus = async (text: string, key: string) => {
    let prevTask
    const founded = project?.tasks?.find((el) => el.id === activeTask?.id)
    if (founded) prevTask = founded[key as keyof Task] as string

    if (activeTask && text && prevTask?.trim() !== text.trim()) {
      activeTask[key as keyof Task] = text
      setActiveTask(activeTask)
      onSubmit()
    }
    setIsEditing((prevState) => ({
      ...prevState,
      isDescEditing: false,
      isNameEditing: false,
    }))
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
    <>
      <TaskStyles>
        <DrawerComponent
          activeTaskIndex={activeTaskIndex}
          setActiveTaskIndex={setActiveTaskIndex}
          setActiveTask={setActiveTask}
          tasks={project.tasks ?? []}
          projectName={project.name}
        />
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box>
            <Button
              variant="contained"
              style={{ margin: '3em 2em', float: 'right' }}
              startIcon={<AddIcon />}
              onClick={() => setIsOpen(true)}
            >
              Create task
            </Button>
          </Box>
          {project?.tasks?.length ? (
            <Box style={{ display: 'flex', justifyContent: 'space-around' }}>
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  {showIcon((activeTask?.type as Type).label)}
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
                    ) => handleOutFocus(event.target.value, 'name')}
                    onKeyDown={onKeyDown}
                    onChange={(
                      event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                    ) =>
                      setActiveTask((prevState: Task) => ({
                        ...prevState,
                        name: event.target.value,
                      }))
                    }
                    value={activeTask?.name}
                    setActiveTask={setActiveTask}
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
                    ) => handleOutFocus(event.target.value, 'description')}
                    onKeyDown={onKeyDown}
                    value={activeTask?.description}
                    setActiveTask={setActiveTask}
                  />
                </Box>
              </Box>
              <Accordion
                expanded={expanded}
                onChange={() => setExpanded(!expanded)}
                style={{ height: expanded ? '100%' : '50px', width: '25%' }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    sx={{
                      width: '25%',
                    }}
                  >
                    Details
                  </Typography>
                  {!expanded && (
                    <Typography sx={{ color: 'text.secondary' }}>
                      {Object.keys(activeTask as Task)
                        .filter(
                          (el) =>
                            el === 'assignee' ||
                            el === 'reporter' ||
                            el === 'status'
                        )
                        .join(', ')}
                    </Typography>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  {expanded && (
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '2em',
                      }}
                    >
                      <Button
                        style={{
                          backgroundColor:
                            activeStatus.value === 'in-progress'
                              ? '#1976d2'
                              : activeStatus.value === 'done'
                              ? '#2e7d32'
                              : '#dfe1e6',
                          color:
                            activeStatus.value === 'to-do' ? 'black' : 'white',
                          borderRadius: '5px',
                          width:
                            activeStatus.value === 'in-progress'
                              ? '11em'
                              : '7em',
                        }}
                        endIcon={<ExpandMoreIcon />}
                        onClick={handleClick}
                      >
                        {activeStatus.label}
                      </Button>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2em',
                        }}
                      >
                        <InputLabel>
                          <b>Progress:</b>
                        </InputLabel>
                        {showProgress(activeStatus)}
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2em',
                        }}
                      >
                        <InputLabel>
                          <b>Assignee:</b>
                        </InputLabel>
                        {isEditing.isAssigneeEditing ? (
                          <FormControl
                            onKeyDown={onKeyDownAssignee}
                            style={{ width: '14rem', height: '50px' }}
                          >
                            <Select
                              style={{ height: '50px' }}
                              value={assignee.name ?? ''}
                              renderValue={(value: string) => (
                                <RenderUser
                                  name={value}
                                  image={assignee.image}
                                />
                              )}
                              onChange={(event: SelectChangeEvent<string>) => {
                                setActiveTask((prevState: Task) => ({
                                  ...prevState,
                                  assignee: users.find(
                                    (user: User) =>
                                      user.name === event.target.value
                                  ),
                                }))
                              }}
                            >
                              {users.map((user: User) => (
                                <MenuItem key={user.id} value={user.name}>
                                  <RenderUser
                                    name={user.name}
                                    image={user.image}
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        ) : (
                          <InputLabel
                            onClick={() =>
                              setIsEditing((prevState) => ({
                                ...prevState,
                                isAssigneeEditing: true,
                              }))
                            }
                          >
                            <RenderUser
                              name={assignee.name}
                              image={assignee.image}
                            />
                          </InputLabel>
                        )}
                      </Box>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2em',
                        }}
                      >
                        <InputLabel>
                          <b>Reporter:</b>
                        </InputLabel>
                        <Box
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                          }}
                        >
                          <InputLabel>
                            <RenderUser
                              name={reporter.name}
                              image={reporter.image}
                            />
                          </InputLabel>
                          <InputLabel>{reporter.email}</InputLabel>
                        </Box>
                      </Box>
                    </Box>
                  )}
                </AccordionDetails>
              </Accordion>
            </Box>
          ) : (
            <InputLabel style={{ marginLeft: '3em' }}>
              No tasks available
            </InputLabel>
          )}
        </Box>
      </TaskStyles>
      <Popper
        placement="bottom-start"
        id={id}
        open={menuOpen}
        anchorEl={anchorEl}
      >
        <Box
          sx={{
            border: 1,
            borderColor: '#dadee4',
            bgcolor: 'background.paper',
            borderRadius: '0.5em',
            marginTop: '5px',
          }}
        >
          <MenuList>
            {statuses.map((status: Status) => (
              <MenuItem key={status.value}>
                <Button
                  style={{
                    height: '2em',
                    backgroundColor:
                      status.value === 'in-progress'
                        ? '#1976d2'
                        : status.value === 'done'
                        ? '#2e7d32'
                        : '#dfe1e6',
                    color: status.value === 'to-do' ? 'black' : 'white',
                    borderRadius: '5px',
                  }}
                  variant="contained"
                  onClick={() => {
                    setActiveTask((prevState: Task) => ({
                      ...prevState,
                      status,
                    }))
                    setAnchorEl(null)
                    if (removedStatus) statuses.push(removedStatus)
                    setRemovedStatus(status)
                    setStatuses(
                      statuses.filter((el) => el.value !== status.value)
                    )
                    project?.tasks?.map((el) => {
                      if (el.id === activeTask?.id) {
                        el.status = status
                        return el
                      }
                      return el
                    })
                    onSubmit()
                  }}
                >
                  {status.label}
                </Button>
              </MenuItem>
            ))}
          </MenuList>
        </Box>
      </Popper>
    </>
  )
}

export default Content
