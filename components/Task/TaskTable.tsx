import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import Router from 'next/router'
import { onDeleteItem } from '../../lib/api'
import styles from '../../styles/tasks/TaskTable.module.scss'
import { Task, Type, User } from '../../types/types'
import RenderUser from '../RenderUser'
import showIcon from '../showIcon'

const setActiveTask = (setOpened: Function, setTask: Function, task: Task) => {
  setOpened()
  setTask(task)
}

const TaskTable = ({
  tasks,
  setTasks,
  setTask,
  setOpened,
}: {
  tasks: Task[]
  setTasks: Function
  setTask: Function
  setOpened: Function
}) => {
  return (
    <Box className={styles.table}>
      <TableContainer>
        <Table aria-label="task table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Assignee</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task: Task) => {
              const type = task.type as Type
              const assignee = task.assignee as User
              return (
                <TableRow key={task.id}>
                  <TableCell width={208}>
                    <Tooltip title={task.name}>
                      <Box className={styles.task}>
                        {showIcon(type.label)}
                        <Typography
                          className={styles.name}
                          onClick={() =>
                            setActiveTask(setOpened, setTask, task)
                          }
                        >
                          {task.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <RenderUser name={assignee.name} image={assignee.image} />
                  </TableCell>
                  <TableCell>
                    <ButtonGroup className={styles.button_group}>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={async () =>
                          await onDeleteItem(
                            task.id,
                            setTasks,
                            tasks,
                            'task/deleteTask'
                          )
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() =>
                          Router.push(
                            '/project/[id]',
                            `/project/${task.projectId}`
                          )
                        }
                        variant="contained"
                      >
                        View
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default TaskTable
