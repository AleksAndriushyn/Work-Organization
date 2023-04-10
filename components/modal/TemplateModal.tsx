import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material'
import { MouseEventHandler } from 'react'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Template } from '../../types/types'
import TemplateForm from '../forms/TemplateForm'

const TemplateModal = ({
  open,
  onClose,
  onSubmit,
  template,
  setTemplate,
}: {
  open: boolean
  onClose: MouseEventHandler<HTMLButtonElement>
  onSubmit: SubmitHandler<FieldValues>
  template: Template | null
  setTemplate: Function
}) => {
  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <DialogTitle
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Create Template
      </DialogTitle>
      <DialogContent>
        <TemplateForm
          onSubmit={onSubmit}
          template={template}
          setTemplate={setTemplate}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained" form="template-form" type="submit">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TemplateModal
