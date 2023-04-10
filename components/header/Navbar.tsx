import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { MenuItem, MenuList } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getProjects } from '../../lib/projects'
import { Project } from '../../types/types'
import styles from '../../styles/header/Navbar.module.scss'
import ProjectListPopper from './ProjectListPopper'

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setProjects(await getProjects())
    }
    fetchData()
  }, [])

  return (
    <nav>
      <MenuList className={styles.menu_list}>
        <MenuItem className={styles.menu_item}>
          <Link className="link" href={'/'}>
            Work Organization
          </Link>
        </MenuItem>
        <MenuItem
          className={styles.menu_item}
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            setAnchorEl(anchorEl ? null : event.currentTarget)
          }}
        >
          Projects
          <ExpandMoreIcon />
        </MenuItem>
        <MenuItem className={styles.menu_item}>
          <Link href="/Tasks">Tasks</Link>
        </MenuItem>
      </MenuList>
      <ProjectListPopper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        projects={projects}
      />
    </nav>
  )
}
export default Navbar

