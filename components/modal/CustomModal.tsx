import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { MouseEventHandler } from 'react'
import styles from '../../styles/Modal.module.scss'
import WarningAlert from '../WarningAlert'

const CustomModal = ({
  open,
  onClose,
  content,
  isError,
  form,
  anchorEl,
  setAnchorEl,
  saveTemplate,
  openTemplateModal,
}: {
  open: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  content: JSX.Element
  isError: boolean
  form: string
  anchorEl?: any
  setAnchorEl?: Function
  saveTemplate?: boolean
  openTemplateModal?: Function
}) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Create {form === 'task-form' ? 'Task' : 'Project'}
        {form === 'task-form' ? (
          <MoreHorizIcon
            className={styles.options}
            onClick={(event: any) =>
              setAnchorEl && setAnchorEl(anchorEl ? null : event.currentTarget)
            }
          />
        ) : (
          ''
        )}
      </DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          onClick={() =>
            saveTemplate && openTemplateModal && openTemplateModal()
          }
          variant="contained"
          form={form}
          type="submit"
        >
          Submit
        </Button>
      </DialogActions>
      {isError && <WarningAlert />}
    </Dialog>
  )
}

export default CustomModal
