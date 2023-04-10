import { Box, Button, MenuItem, MenuList, Popper } from '@mui/material'
import { Project, Status, Task } from '../../../types/types'

export const ProgressPopper = ({
  id,
  menuOpen,
  anchorEl,
  statuses,
  setStatuses,
  activeTask,
  setActiveTask,
  setAnchorEl,
  removedStatus,
  setRemovedStatus,
  project,
  saveData,
}: {
  id: string | undefined
  menuOpen: boolean
  anchorEl: null | HTMLElement
  statuses: Status[]
  setStatuses: Function
  activeTask: Task | null
  setActiveTask: Function
  setAnchorEl: Function
  removedStatus: Status | null
  setRemovedStatus: Function
  project?: Project
  saveData: Function
}) => {
  const saveStatus = (status: Status) => {
    setActiveTask((prevState: Task) => ({
      ...prevState,
      status,
    }))
    setAnchorEl(null)
    if (removedStatus) statuses.push(removedStatus)
    setRemovedStatus(status)
    setStatuses(statuses.filter((el: Status) => el.value !== status.value))
    project?.tasks?.map((el: Task) => {
      if (el.id === activeTask?.id) {
        el.status = status
        return el
      }

      return el
    })
    saveData(status)
  }
  return (
    <Popper
      placement="bottom-start"
      sx={{ zIndex: 9999 }}
      id={id}
      open={menuOpen}
      anchorEl={anchorEl}
    >
      <Box
        sx={{
          border: 1,
          borderColor: '#dadee4',
          bgcolor: 'background.paper',
          borderRadius: '0.5em',
          marginTop: '5px',
        }}
      >
        <MenuList>
          {statuses.map((status: Status) => (
            <MenuItem key={status.value}>
              <Button
                style={{
                  height: '2em',
                  backgroundColor:
                    status.value === 'in-progress'
                      ? '#1976d2'
                      : status.value === 'done'
                      ? '#2e7d32'
                      : '#dfe1e6',
                  color: status.value === 'to-do' ? 'black' : 'white',
                  borderRadius: '5px',
                }}
                variant="contained"
                onClick={() => saveStatus(status)}
              >
                {status.label}
              </Button>
            </MenuItem>
          ))}
        </MenuList>
      </Box>
    </Popper>
  )
}
