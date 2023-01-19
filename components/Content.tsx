import AddIcon from '@mui/icons-material/Add'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import {
  Box,
  Button,
  Drawer,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import { Styles } from '../styled-components/global.styled'
import { Project, Task } from '../types/types'
import CreateButton from './CreateButton'

const Content = ({
  activeTask,
  setActiveTask,
  project,
  drawerOpen,
  setDrawerOpen,
  setIsOpen,
}: {
  activeTask: Task | null
  project: Project
  drawerOpen: boolean
  setDrawerOpen: Function
  setIsOpen: Function
  setActiveTask: Function
}) => {
  return (
    <>
      <Button
        style={{ marginTop: '10px' }}
        startIcon={<ChevronRightIcon />}
        onClick={() => setDrawerOpen(true)}
      />
      <Styles>
        <Drawer
          anchor={'left'}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <ListSubheader>Project: {project.name}</ListSubheader>
            {project.tasks?.map((task: Task) => (
              <ListItem key={task.id} disablePadding>
                <ListItemButton
                  onClick={() => {
                    setActiveTask(task)
                  }}
                >
                  <ListItemText primary={task.name} />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem>
              <Button
                startIcon={<AddIcon />}
                onClick={() => setIsOpen(true)}
                variant="contained"
              />
            </ListItem>
          </List>
        </Drawer>
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {project?.tasks?.length ? (
            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                border: '1px solid black',
                padding: '10px',
              }}
            >
              <InputLabel>Name: {activeTask?.name}</InputLabel>
              <InputLabel>Type: {activeTask?.type}</InputLabel>
              <InputLabel>Description: {activeTask?.description}</InputLabel>
            </Box>
          ) : (
            <>
              <InputLabel>No tasks available</InputLabel>
              <CreateButton text={'Create task'} handleClickOpen={setIsOpen} />
            </>
          )}
        </Box>
      </Styles>
    </>
  )
}

export default Content
