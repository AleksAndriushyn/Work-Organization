import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Tooltip,
} from '@mui/material'
import styles from '../../../styles/tasks/Drawer.module.scss'
import { Project, Task, Type } from '../../../types/types'
import TaskIcon from '../TaskIcon'

export const DrawerComponent = (props: {
  activeTaskIndex: number
  setActiveTaskIndex: Function
  projectName: string
  setActiveTask: Function
  tasks: Task[]
  setProject: Function
}) => {
  const {
    projectName,
    setActiveTask,
    activeTaskIndex,
    setActiveTaskIndex,
    tasks,
    setProject,
  } = props

  const deleteTask = (task: Task, index: number) => {
    fetch('/api/task/deleteTask', {
      method: 'DELETE',
      body: JSON.stringify(task.id),
    })
    setProject((prevState: Project) => ({
      ...prevState,
      tasks: tasks.filter((el) => el.id !== task.id),
    }))
    const nextTask = tasks[index + 1]
    const prevTask = tasks[index - 1]
    setActiveTask(nextTask ? nextTask : prevTask ? prevTask : null)
    setActiveTaskIndex(nextTask ? index : prevTask ? index - 1 : 0)
  }

  const handleListItemClick = (task: Task, index: number) => {
    setActiveTask(task)
    setActiveTaskIndex(index)
  }

  return (
    <Drawer
      anchor="left"
      open
      ModalProps={{
        keepMounted: true,
      }}
      sx={{ zIndex: 0 }}
      variant="permanent"
    >
      <List className={styles.drawer_list}>
        <ListSubheader className={styles.drawer_subheader}>
          Project: {projectName}
        </ListSubheader>
        <Divider />
        {tasks?.map((task: Task, index) => (
          <ListItem
            key={task.id}
            className={`${styles.drawer_listItem} ${
              activeTaskIndex === index ? styles.active : ''
            }`}
          >
            <Tooltip title={task.name}>
              <Box className={styles.drawer_listItemText}>
                <TaskIcon type={(task?.type as Type).label} />
                <ListItemText onClick={() => handleListItemClick(task, index)}>
                  <p>{task.name}</p>
                </ListItemText>
              </Box>
            </Tooltip>
            <IconButton onClick={() => deleteTask(task, index)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
