import {
  Box,
  Button,
  Divider,
  ListItemText,
  MenuItem,
  MenuList,
  Popper,
} from '@mui/material'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

const UserPopup = (props: {
  session: Session | null
  anchorEl: null | HTMLElement
}) => {
  const { session, anchorEl } = props
  const menuOpen = Boolean(anchorEl)
  const id = menuOpen ? 'user-popper' : undefined
  return (
    <Popper id={id} open={menuOpen} anchorEl={anchorEl}>
      <Box
        sx={{
          border: 1,
          p: 1,
          bgcolor: 'background.paper',
          marginTop: '10px',
        }}
      >
        <MenuList>
          <MenuItem style={{ background: 'none', cursor: 'default' }}>
            <ListItemText>{session?.user?.name}</ListItemText>
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
            <Button
              style={{
                height: '30px',
              }}
              onClick={() => signOut()}
              variant="outlined"
              color="error"
            >
              Logout
            </Button>
          </MenuItem>
        </MenuList>
      </Box>
    </Popper>
  )
}

export default UserPopup
