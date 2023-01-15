import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Router from 'next/router'
import { onDeleteItem } from '../../lib/api'
import { Task } from '../../types/types'

const setActiveTask = (
  setOpened: Function,
  setTask: Function,
  project: Task
) => {
  setOpened()
  setTask(project)
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
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="task table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell>
              <b>Type</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task: Task) => (
            <TableRow key={task.id}>
              <TableCell>
                <Button onClick={() => setActiveTask(setOpened, setTask, task)}>
                  <b>{task.name}</b>
                </Button>
              </TableCell>
              <TableCell>{task?.type}</TableCell>
              <TableCell>
                <ButtonGroup>
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
                      Router.push('/task/[id]', `/task/${task.id}`)
                    }
                    style={{ marginLeft: '5px' }}
                    variant="contained"
                  >
                    View
                  </Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TaskTable
