import {
  Box,
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import Router from 'next/router'
import { useState } from 'react'
import { onDeleteItem } from '../../lib/api'
import styles from '../../styles/tasks/TaskTable.module.scss'
import { Project, Task, Type, User } from '../../types/types'
import RenderUser from '../custom-components/CustomUser'
import TaskIcon from './TaskIcon'

const setActiveTask = (
  setOpened: Function,
  setTask: Function,
  task: Task,
  setEdit: Function
) => {
  setOpened()
  setTask(task)
  setEdit(true)
}

const TaskTable = ({
  tasks,
  setTasks,
  setTask,
  setOpened,
  setIsEditing,
  projects,
  filters,
}: {
  tasks: Task[]
  setTasks: Function
  setTask: Function
  setOpened: Function
  setIsEditing: Function
  projects: Project[]
  filters: any
}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const filterTasks = (task: Task) => {
    const taskNameMatch = filters.name
      ? task.name.toLowerCase().includes(filters.name.toLowerCase())
      : true
    const projectMatch = filters.projectName
      ? projects.some(
          (project: Project) =>
            project.id === task.projectId &&
            project.name
              .toLowerCase()
              .includes(filters.projectName.toLowerCase())
        )
      : true
    const assigneeMatch = filters.assignee
      ? (task.assignee as User).id === filters.assignee.id
      : true
    return taskNameMatch && projectMatch && assigneeMatch
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasks.length - page * rowsPerPage)
  const slicedTasks = tasks
    .filter(filterTasks)
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Box className={styles.table}>
      <TableContainer>
        <Table aria-label="task-table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Assignee</b>
              </TableCell>
              <TableCell>
                <b>Project</b>
              </TableCell>
              <TableCell>
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedTasks.map((task: Task) => {
              const type = task.type as Type
              const assignee = task.assignee as User
              const projectName = projects.find(
                (project) => project.id === task.projectId
              )?.name
              return (
                <TableRow key={task.id}>
                  <TableCell width={208}>
                    <Tooltip title={task.name}>
                      <Box
                        className={styles.task}
                        onClick={() =>
                          setActiveTask(setOpened, setTask, task, setIsEditing)
                        }
                      >
                        <TaskIcon type={type.label} />
                        <Typography className={styles.name}>
                          {task.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <RenderUser name={assignee.name} image={assignee.image} />
                  </TableCell>
                  <TableCell>
                    <Tooltip title={projectName}>
                      <Box className={styles.project}>
                        <Typography className={styles.name}>
                          {projectName}
                        </Typography>
                      </Box>
                    </Tooltip>
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
            {emptyRows > 0 && (
              <TableRow style={{ height: 72.8 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasks.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default TaskTable
