import {
  Avatar,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getProjects } from '../../lib/projects'
import { getRandomUsers } from '../../lib/users'
import styles from '../../styles/tasks/TaskForm.module.scss'
import { Project, Task, Type, User } from '../../types/types'
import Error from '../Error'
import RenderUser from '../RenderUser'
import showIcon from '../showIcon'

const TaskForm = ({
  onSubmit,
  task,
  setTask,
  project,
}: {
  onSubmit: SubmitHandler<FieldValues>
  task: Task | null
  setTask: Function
  project?: Project
}) => {
  const { register, handleSubmit, formState } = useForm()
  const [projects, setProjects] = useState<Project[]>([])
  const [users, setUsers] = useState<User[]>([])

  const type = task?.type as Type
  const name = projects.find(
    (project: Project) => project.id === task?.projectId
  )?.name
  const projectName = name ?? project?.name ?? ''
  const assignee = task?.assignee as User
  const types = [
    { label: 'Epic', value: 'epic' },
    { label: 'Task', value: 'task' },
    { label: 'Subtask', value: 'subtask' },
  ]

  useEffect(() => {
    ;(async () => {
      const resp = [getProjects(), getRandomUsers()]
      const [projectsData, usersData] = await Promise.all(resp)
      setProjects(projectsData as Project[])
      setUsers(usersData as User[])
    })()
  }, [])

  return (
    <form
      id="task-form"
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Name"
        autoFocus
        type="text"
        {...register('name', { required: 'Name is required.' })}
        value={task?.name ?? ''}
        onChange={(event) =>
          setTask((prevState: Task) => ({
            ...prevState,
            name: event.target.value,
          }))
        }
      />
      <Error formState={formState} name="name" />
      <FormGroup className={styles.form_group}>
        <FormControl>
          <InputLabel>Select type</InputLabel>
          <Select
            value={type?.label ?? ''}
            label="Select type"
            {...register('type', {
              required: 'Type is required.',
            })}
            renderValue={(value: string) => {
              return (
                <div className={styles.type}>
                  {showIcon(value)}
                  {value}
                </div>
              )
            }}
            onChange={(event: SelectChangeEvent<string>) => {
              setTask((prevState: Task) => ({
                ...prevState,
                type: types.find(
                  (type: Type) => type.value === event.target.value
                ),
              }))
            }}
          >
            {types.map((type: Type, index: number) => (
              <MenuItem key={index} value={type.value} className={styles.type}>
                {showIcon(type.label)}
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Error formState={formState} name="type" />
        <FormControl>
          <InputLabel>Select project</InputLabel>
          <Select
            disabled={project ? true : false}
            value={projectName ?? ''}
            label="Select project"
            {...register('project', {
              required: project ?? projectName ? false : 'Project is required.',
            })}
            onChange={(event: SelectChangeEvent<string>) => {
              setTask((prevState: Task) => ({
                ...prevState,
                projectId: projects.find(
                  (project: Project) => project.name === event.target.value
                )?.id,
              }))
            }}
          >
            {projects.map((project: Project) => (
              <MenuItem key={project.id} value={project.name}>
                {project.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Error formState={formState} name="project" />
        <FormControl>
          <InputLabel>Select assignee</InputLabel>
          <Select
            value={assignee?.name ?? ''}
            label="Select assignee"
            {...register('assignee', {
              required: 'Assignee is required.',
            })}
            renderValue={(value: string) => (
              <RenderUser name={value} image={assignee.image} />
            )}
            onChange={(event: SelectChangeEvent<string>) => {
              setTask((prevState: Task) => ({
                ...prevState,
                assignee: users.find(
                  (user: User) => user.name === event.target.value
                ),
              }))
            }}
          >
            {users.map((user: User) => (
              <MenuItem key={user.id} value={user.name}>
                <div className={styles.user}>
                  <Avatar alt={user.name} src={user.image} variant="rounded" />
                  {user.name}
                </div>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </FormGroup>
      <Error formState={formState} name="assignee" />
      <TextField
        label="Description"
        type="text"
        {...register('description')}
        value={task?.description ?? ''}
        onChange={(event) =>
          setTask((prevState: Task) => ({
            ...prevState,
            description: event.target.value,
          }))
        }
      />
    </form>
  )
}

export default TaskForm

