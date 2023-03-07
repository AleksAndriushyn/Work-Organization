import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import styles from '../../styles/projects/ProjectForm.module.scss'
import { Project, Type } from '../../types/types'
import Error from '../Error'

const ProjectForm = ({
  onSubmit,
  project,
  setProject,
}: {
  onSubmit: SubmitHandler<FieldValues>
  project: Project | null
  setProject: Function
}) => {
  const { register, handleSubmit, formState } = useForm()
  const defaultTypes = [
    { label: 'Team Managed', value: 'team-managed' },
    { label: 'Company Managed', value: 'company-managed' },
  ]
  const type = project?.type as Type

  return (
    <form
      className={styles.form}
      id="project-form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="Name"
        autoFocus
        type="text"
        {...register('name', { required: 'Name is required.' })}
        value={project?.name ?? ''}
        onChange={(value) =>
          setProject((prevState: Project) => ({
            ...prevState,
            name: value.target.value,
          }))
        }
      />
      <Error formState={formState} name="name" />
      <FormControl>
        <InputLabel>Select type</InputLabel>
        <Select
          label="Select type"
          value={type?.value ?? ''}
          {...register('type', {
            required: 'Type is required.',
          })}
          onChange={(value) => {
            setProject((prevState: Project) => ({
              ...prevState,
              type: defaultTypes.find(
                (el: Type) => el.value === value.target.value
              ),
            }))
          }}
        >
          {defaultTypes.map((type: Type, idx: number) => (
            <MenuItem key={idx} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Error formState={formState} name="type" />
    </form>
  )
}

export default ProjectForm

