import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Tooltip,
} from '@mui/material'
import { ListItemTextStyle } from '../styled-components/global.styled'
import { Task } from '../types/types'

export const DrawerComponent = (props: {
  activeTaskIndex: number
  setActiveTaskIndex: Function
  projectName: string
  setActiveTask: Function
  tasks: Task[]
}) => {
  const {
    projectName,
    setActiveTask,
    activeTaskIndex,
    setActiveTaskIndex,
    tasks,
  } = props

  return (
    <Drawer
      anchor={'left'}
      open
      ModalProps={{
        keepMounted: true,
      }}
      sx={{ zIndex: 0 }}
      variant="permanent"
    >
      <List style={{ marginTop: '60px', width: '200px', zIndex: 0 }}>
        <ListSubheader
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            fontSize: '18px',
            textAlign: 'center',
          }}
        >
          Project: {projectName}
        </ListSubheader>
        <Divider />
        {tasks?.map((task: Task, index) => (
          <ListItem
            key={task.id}
            style={
              activeTaskIndex === index
                ? {
                    border: '2px solid #3482f7',
                    borderRadius: '8px',
                    textDecoration: 'underline',
                  }
                : {
                    borderTop: '1px solid #ecedf1',
                    borderBottom: '1px solid #ecedf1',
                  }
            }
          >
            <Tooltip title={task.name}>
              <ListItemTextStyle>
                <ListItemText
                  onClick={() => {
                    setActiveTask(task)
                    setActiveTaskIndex(index)
                  }}
                >
                  <div
                    style={{
                      cursor: 'pointer',
                      width: '150px',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {task.name}
                  </div>
                </ListItemText>
              </ListItemTextStyle>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
