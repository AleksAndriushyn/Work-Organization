import { useForm } from 'react-hook-form'

const ProjectForm = ({ onSubmit }: any) => {
  const { register, handleSubmit } = useForm()

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form id={'projectForm'} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label style={{ marginRight: '10px' }}>Name:</label>
          <input type="text" {...register('name')} />
        </div>
      </form>
    </div>
  )
}

export default ProjectForm

