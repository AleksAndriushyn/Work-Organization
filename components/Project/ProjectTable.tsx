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
            {projects.map((project: Project) => {
              const type = project?.type as Type
              return (
                <TableRow key={project.name}>
                  <TableCell width={208}>
                    <Tooltip title={project.name}>
                      <Typography
                        className={styles.name}
                        onClick={() =>
                          setActiveProject(setOpened, setProject, project)
                        }
                      >
                        {project.name}
                      </Typography>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProjectTable
