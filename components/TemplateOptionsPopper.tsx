import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  MenuList,
  Popper,
  Select,
} from '@mui/material'
import { useEffect } from 'react'
import { Task, Template } from '../types/types'

const TemplateOptionsPopper = ({
  open,
  anchorEl,
  templates,
  template,
  setTemplate,
  setTask,
  isOpen,
  setIsOpen,
  task,
}: {
  open: boolean
  anchorEl: any
  templates: Template[]
  template: Template | null
  setTemplate: Function
  setTask: Function
  isOpen: boolean
  setIsOpen: Function
  task: Task | null
}) => {
  useEffect(() => {
    !isOpen && setTemplate(null)
  }, [isOpen])

  const setTempl = (templ: Template) => {
    const { id, templateName, ...template } = templ
    console.log(id, templateName)

    if (task?.id) {
      templ.id = task.id
      return { id: task.id, ...template }
    }

    return { ...template }
  }

  return (
    <Popper
      placement="bottom-end"
      style={{ zIndex: 9999 }}
      open={open}
      anchorEl={anchorEl}
    >
      <Box
        sx={{
          border: 1,
          bgcolor: 'background.paper',
        }}
      >
        <MenuList
          style={{
            width: '10rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <MenuItem
            onClick={() => {
              setIsOpen(!isOpen)
            }}
            style={{ margin: 'auto', background: 'none' }}
          >
            {isOpen ? 'Close' : 'Import template'}
          </MenuItem>
          {isOpen && (
            <Box style={{ display: 'flex', justifyContent: 'center' }}>
              <FormControl>
                <InputLabel>Templates</InputLabel>
                <Select
                  label="Templates"
                  value={template?.templateName ?? ''}
                  onChange={(e) => {
                    const found = templates.find(
                      (el) => el.templateName === e.target.value
                    )
                    setTemplate(found)
                    setTask(setTempl(found as Template))
                  }}
                  style={{ width: '8rem' }}
                >
                  {templates.map((templ) => (
                    <MenuItem key={templ.id} value={templ.templateName}>
                      {templ.templateName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          )}
        </MenuList>
      </Box>
    </Popper>
  )
}

export default TemplateOptionsPopper
