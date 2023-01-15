import { Box, MenuItem } from '@mui/material'
import Link from 'next/link'

const MENU_LIST = [
  { text: 'Projects', href: '/Projects' },
  { text: 'Tasks', href: '/Tasks' },
]

const Navbar = () => {
  return (
    <Box style={{ display: 'flex', textDecoration: 'none' }}>
      <MenuItem style={{ background: 'none' }}>
        <Link href={'/'}>Work Organization</Link>
      </MenuItem>
      {MENU_LIST.map((menu) => (
        <MenuItem style={{ background: 'none' }} key={menu.text}>
          <Link href={menu.href}>{menu.text}</Link>
        </MenuItem>
      ))}
    </Box>
  )
}
export default Navbar

