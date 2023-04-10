import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Popper,
} from '@mui/material'
import Link from 'next/link'
import { Project } from '../../types/types'
import styles from '../../styles/header/ProjectListPopper.module.scss'

const ProjectListPopper = ({
  anchorEl,
  setAnchorEl,
  projects,
}: {
  anchorEl: HTMLElement | null
  setAnchorEl: Function
  projects: Project[]
}) => (
  <Popper open={Boolean(anchorEl)} placement="bottom-start" anchorEl={anchorEl}>
    <List className={styles.popper_list}>
      {(projects.length > 3 ? projects.slice(0, 3) : projects).map(
        (project: Project) => (
          <Box key={project.id}>
            <ListItem key={project.id} className={styles.popper_listItem}>
              <ListItemText>
                <Link
                  onClick={() => setAnchorEl(null)}
                  href={`/project/${project.id}`}
                >
                  <p>{project.name}</p>
                </Link>
              </ListItemText>
            </ListItem>
            <Divider />
          </Box>
        )
      )}
      <ListItem>
        <ListItemText className={styles.viewAll}>
          <Link href={'/Projects'}>View all projects</Link>
        </ListItemText>
      </ListItem>
    </List>
  </Popper>
)

export default ProjectListPopper
