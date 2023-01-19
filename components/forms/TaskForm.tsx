import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { getProjects } from '../../lib/projects'
import { Project, Task } from '../../types/types'
import Error from '../Error'

const TaskForm = ({
  onSubmit,
  task,
  setTask,
  project,
}: {
  onSubmit: SubmitHandler<FieldValues>
  task: Task | null
  setTask: Function
  project: Project | null
}) => {
  const { register, handleSubmit, formState } = useForm()
  const [projects, setProjects] = useState<Project[]>([])

  const name = projects.find(
    (project: Project) => project.id === task?.projectId
  )?.name
  const [projectName, setProjectName] = useState<string>(
    name ?? project?.name ?? ''
  )

  useEffect(() => {
    ;(async () => setProjects(await getProjects()))()
  }, [])

  return (
    <form
      id={'task-form'}
      onSubmit={handleSubmit(onSubmit)}
      style={{
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <TextField
        label={'Name'}
        type="text"
        {...register('name', { required: 'Name is required.' })}
        value={task?.name ?? ''}
        onChange={(value) =>
          setTask((prevState: Task) => ({
            ...prevState,
            name: value.target.value,
          }))
        }
      />
      <Error formState={formState} name={'name'} />
      <TextField
        label={'Type'}
        type={'text'}
        {...register('type', { required: 'Type is required.' })}
        value={task?.type ?? ''}
        onChange={(value) =>
          setTask((prevState: Task) => ({
            ...prevState,
            type: value.target.value,
          }))
        }
      />
      <Error formState={formState} name={'type'} />
      <FormControl>
        <InputLabel>Select project</InputLabel>
        <Select
          disabled={project ? true : false}
          value={projectName ?? ''}
          label={'Select project'}
          {...register('project', {
            required: project ? false : 'Project is required.',
          })}
          onChange={(value) => {
            setProjectName(value.target.value)
            setTask((prevState: Task) => ({
              ...prevState,
              projectId: projects.find(
                (project: Project) => project.name === value.target.value
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
        <Error formState={formState} name={'project'} />
      </FormControl>
      <TextField
        label="Description"
        type="text"
        {...register('description')}
        value={task?.description ?? ''}
        onChange={(value) =>
          setTask((prevState: Task) => ({
            ...prevState,
            description: value.target.value,
          }))
        }
      />
    </form>
  )
}

export default TaskForm


