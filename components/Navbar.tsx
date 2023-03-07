import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Popper,
} from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProjects } from '../lib/projects'
import { getTasks } from '../lib/tasks'
import { MenuItemStyle } from '../styled-components/global.styled'
import { Project, Task } from '../types/types'

const Navbar = () => {
  const [anchorProjectEl, setAnchorProjectEl] = useState<HTMLElement | null>(
    null
  )
  const [anchorTaskEl, setAnchorTaskEl] = useState<HTMLElement | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setProjects(await getProjects())
      setTasks(await getTasks())
    }
    fetchData()
  }, [])

  return (
    <>
      <Box style={{ display: 'flex', textDecoration: 'none' }}>
        <MenuItemStyle>
          <MenuItem className="menu-item">
            <Link className="link" href={'/'}>
              Work Organization
            </Link>
          </MenuItem>
        </MenuItemStyle>
        <MenuItemStyle>
          <MenuItem
            className="menu-item"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorTaskEl(null)
              setAnchorProjectEl(anchorProjectEl ? null : event.currentTarget)
            }}
          >
            Projects
            <ExpandMoreIcon />
          </MenuItem>
        </MenuItemStyle>
        <MenuItemStyle>
          <MenuItem
            className="menu-item"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorProjectEl(null)
              setAnchorTaskEl(anchorTaskEl ? null : event.currentTarget)
            }}
          >
            Tasks
            <ExpandMoreIcon />
          </MenuItem>
        </MenuItemStyle>
      </Box>
      <Popper
        open={Boolean(anchorProjectEl)}
        placement="bottom-start"
        anchorEl={anchorProjectEl}
      >
        <List
          sx={{
            border: 1,
            bgcolor: 'background.paper',
            marginTop: '1em',
          }}
        >
          {(projects.length > 3 ? projects.slice(0, 3) : projects).map(
            (project: Project) => (
              <ListItem key={project.id}>
                <ListItemText>
                  <Link
                    onClick={() => setAnchorProjectEl(null)}
                    href={`/project/${project.id}`}
                  >
                    <p
                      style={{
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '10rem',
                      }}
                    >
                      {project.name}
                    </p>
                  </Link>
                </ListItemText>
              </ListItem>
            )
          )}
          <Divider />
          <ListItem>
            <ListItemText style={{ textAlign: 'center' }}>
              <Link href={'/Projects'}>View all projects</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Popper>
      <Popper
        open={Boolean(anchorTaskEl)}
        placement="bottom-start"
        anchorEl={anchorTaskEl}
      >
        <List
          sx={{
            border: 1,
            bgcolor: 'background.paper',
            marginTop: '1em',
          }}
        >
          {(tasks.length > 3 ? tasks.slice(0, 3) : tasks).map((task: Task) => (
            <ListItem key={task.id}>
              <ListItemText>
                <Link
                  onClick={() => setAnchorTaskEl(null)}
                  href={`/project/${task.projectId}`}
                >
                  <p
                    style={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      width: '10rem',
                    }}
                  >
                    {task.name}
                  </p>
                </Link>
              </ListItemText>
            </ListItem>
          ))}
          <Divider />
          <ListItem>
            <ListItemText style={{ textAlign: 'center' }}>
              <Link href={'/Tasks'}>View all tasks</Link>
            </ListItemText>
          </ListItem>
        </List>
      </Popper>
    </>
  )
}
export default Navbar

