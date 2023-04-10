import { TextField } from '@mui/material'
import { Task } from '@prisma/client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Template } from '../../types/types'

const TemplateForm = ({
  template,
  setTemplate,
  onSubmit,
}: {
  template: Template | null
  setTemplate: Function
  onSubmit: SubmitHandler<FieldValues>
}) => {
  const { register, handleSubmit } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ padding: '0.5rem' }}
      id="template-form"
    >
      <TextField
        label="Name"
        autoFocus
        type="text"
        {...register('name', {
          required: template?.templateName ? false : 'Name is required.',
        })}
        value={template?.templateName ?? ''}
        onChange={(event) =>
          setTemplate((prevState: Task) => ({
            ...prevState,
            templateName: event.target.value,
          }))
        }
      />
    </form>
  )
}

export default TemplateForm
