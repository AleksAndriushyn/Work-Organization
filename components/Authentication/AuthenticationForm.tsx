import { TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import Error from '../Error'

const AuthenticationForm = ({ onSubmit }: { onSubmit: any }) => {
  const { register, handleSubmit, formState } = useForm()
  return (
    <form
      id={'authentication-form'}
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
      />
      <Error formState={formState} name={'name'} />
      <TextField
        label={'Email'}
        type={'text'}
        {...register('email', { required: 'Email is required.' })}
      />
      <Error formState={formState} name={'email'} />
      <TextField
        label="Password"
        type="text"
        {...register('password', { required: 'Password is required.' })}
      />
      <Error formState={formState} name={'password'} />
    </form>
  )
}

export default AuthenticationForm

