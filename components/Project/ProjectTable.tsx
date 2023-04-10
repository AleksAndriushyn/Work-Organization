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
import styles from '../../styles/projects/ProjectTable.module.scss'
import { Project, Type } from '../../types/types'

const setActiveProject = (
  setOpened: Function,
  setProject: Function,
  project: Project
) => {
  setOpened()
  setProject(project)
}

const ProjectTable = ({
  projects,
  setProjects,
  setProject,
  setOpened,
}: {
  projects: Project[]
  setProjects: Function
  setProject: Function
  setOpened: Function
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

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, projects.length - page * rowsPerPage)
  const slicedProjects = projects.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  )
  return (
    <Box className={styles.table}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>NAME</b>
              </TableCell>
              <TableCell>
                <b>TYPE</b>
              </TableCell>
              <TableCell>
                <b>ACTIONS</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {slicedProjects.map((project: Project) => {
              const type = project?.type as Type
              return (
                <TableRow key={project.name}>
                  <TableCell width={208}>
                    <Tooltip title={project.name}>
                      <Box className={styles.project}>
                        <Typography
                          className={styles.name}
                          onClick={() =>
                            setActiveProject(setOpened, setProject, project)
                          }
                        >
                          {project.name}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Typography>{type.label}</Typography>
                  </TableCell>
                  <TableCell>
                    <ButtonGroup className={styles.button_group}>
                      <Button
                        color="error"
                        variant="contained"
                        onClick={async () =>
                          await onDeleteItem(
                            project.id,
                            setProjects,
                            projects,
                            'project/deleteProject'
                          )
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() =>
                          Router.push('/project/[id]', `/project/${project.id}`)
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
              <TableRow style={{ height: 69.5 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projects.length}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </TableContainer>
    </Box>
  )
}

export default ProjectTable
