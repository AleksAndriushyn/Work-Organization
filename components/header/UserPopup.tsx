import { UserProfile } from '@auth0/nextjs-auth0/client'
import {
  Box,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Popper,
} from '@mui/material'
import AuthorizationButton from '../AuthorizationButton'

const UserPopup = (props: {
  user: UserProfile | undefined
  anchorEl: null | HTMLElement
}) => {
  const { user, anchorEl } = props
  const menuOpen = Boolean(anchorEl)
  const id = menuOpen ? 'user-popper' : undefined
  return (
    <Popper id={id} open={menuOpen} anchorEl={anchorEl}>
      <Box
        sx={{
          border: 1,
          bgcolor: 'background.paper',
          margin: '20px 10px',
        }}
      >
        <MenuList>
          <MenuItem style={{ background: 'none', cursor: 'default' }}>
            <ListItemText>{user?.name}</ListItemText>
          </MenuItem>
          <Divider />
          <MenuItem
            style={{
              background: 'none',
              cursor: 'default',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <AuthorizationButton href="/api/auth/logout" color="error">
              Logout
            </AuthorizationButton>
          </MenuItem>
        </MenuList>
      </Box>
    </Popper>
  )
}

export default UserPopup
