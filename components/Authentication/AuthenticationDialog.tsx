import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import AuthenticationForm from './AuthenticationForm'

const AuthenticationDialog = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: Function
}) => {
  const onSubmit = async (formData: any) => {
    console.log(formData)
  }
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth={true}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <AuthenticationForm onSubmit={onSubmit} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button
          variant={'contained'}
          form={'authentication-form'}
          type="submit"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AuthenticationDialog
