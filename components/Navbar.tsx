import { Box, MenuItem } from '@mui/material'
import Link from 'next/link'
import { MenuItemStyle } from '../styled-components/global.styled'

const MENU_LIST = [
  { text: 'Projects', href: '/Projects' },
  { text: 'Tasks', href: '/Tasks' },
]

const Navbar = () => {
  return (
    <Box style={{ display: 'flex', textDecoration: 'none' }}>
      <MenuItemStyle>
        <MenuItem className="menu-item">
          <Link className="link" href={'/'}>
            Work Organization
          </Link>
        </MenuItem>
      </MenuItemStyle>

      {MENU_LIST.map((menu) => (
        <MenuItemStyle key={menu.text}>
          <MenuItem className="menu-item">
            <Link className="link" href={menu.href}>
              {menu.text}
            </Link>
          </MenuItem>
        </MenuItemStyle>
      ))}
    </Box>
  )
}
export default Navbar

