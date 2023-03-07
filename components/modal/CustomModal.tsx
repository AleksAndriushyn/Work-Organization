import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import WarningAlert from '../WarningAlert'

const CustomModal = ({
  open,
  onClose,
  content,
  isError,
  form,
}: {
  open: boolean
  onClose: Function
  content: JSX.Element
  isError: boolean
  form: string
}) => {
  return (
    <Dialog onClose={() => onClose()} open={open} fullWidth>
      <DialogTitle>Create Project</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Close</Button>
        <Button variant="contained" form={form} type="submit">
          Submit
        </Button>
      </DialogActions>
      {isError && <WarningAlert />}
    </Dialog>
  )
}

export default CustomModal
