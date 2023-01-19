import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Project, Type } from '../../types/types'

const ProjectForm = ({
  onSubmit,
  project,
  setProject,
}: {
  onSubmit: SubmitHandler<FieldValues>
  project: Project | null
  setProject: Function
}) => {
  const { register, handleSubmit } = useForm()
  const defaultTypes = [
    { label: 'Team Managed', value: 'team-managed' },
    { label: 'Company Managed', value: 'company-managed' },
  ]
  const type = project?.type as Type

  return (
    <form id={'project-form'} onSubmit={handleSubmit(onSubmit)}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <InputLabel>Name</InputLabel>
        <TextField
          autoFocus
          type="text"
          {...register('name')}
          value={project?.name ?? ''}
          onChange={(value) =>
            setProject((prevState: Project) => ({
              ...prevState,
              name: value.target.value,
            }))
          }
        />
        <InputLabel style={{ marginTop: '10px' }}>Type</InputLabel>
        <Select
          value={type?.value ?? ''}
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
      </div>
    </form>
  )
}

export default ProjectForm

