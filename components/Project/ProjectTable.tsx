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
import { Project } from '../../types/types'

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
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="project table">
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
          {projects.map((project: Project) => (
            <TableRow key={project.name}>
              <TableCell>
                <Button
                  onClick={() =>
                    setActiveProject(setOpened, setProject, project)
                  }
                >
                  <b>{project.name}</b>
                </Button>
              </TableCell>
              <TableCell>{project?.type?.label}</TableCell>
              <TableCell>
                <ButtonGroup>
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
                    style={{ marginLeft: '5px' }}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ProjectTable
