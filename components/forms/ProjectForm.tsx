import { InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { Project } from '../../types/types'

const ProjectForm = ({
  onSubmit,
  project,
  setProject,
}: {
  onSubmit: any
  project: Project | null
  setProject: Function
}) => {
  const { register, handleSubmit } = useForm()
  const defaultTypes = [
    { label: 'Team Managed', value: 'team-managed' },
    { label: 'Company Managed', value: 'company-managed' },
  ]

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
          onChange={(value: any) =>
            setProject((prevState: Project) => ({
              ...prevState,
              name: value.target.value,
            }))
          }
        />
        <InputLabel style={{ marginTop: '10px' }}>Type</InputLabel>
        <Select
          value={project?.type?.value ?? ''}
          onChange={(value) => {
            setProject((prevState: Project) => ({
              ...prevState,
              type: defaultTypes.find(
                (el: any) => el.value === value.target.value
              ),
            }))
          }}
        >
          {defaultTypes.map((type: any, idx: number) => (
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


