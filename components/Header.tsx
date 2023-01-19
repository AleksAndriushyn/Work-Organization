import { AppBar, Box, Button, Toolbar, Tooltip } from '@mui/material'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Navbar from './Navbar'

const Header = (props: {
  anchorEl: null | HTMLElement
  session: any
  setAnchorEl: Function
}) => {
  const { anchorEl, session, setAnchorEl } = props

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <AppBar style={{ backgroundColor: '#212529' }} position="static">
      <Toolbar>
        <Navbar />
        <Box style={{ width: '100%' }}>
          {session ? (
            <Tooltip title={session.user?.name}>
              <Image
                src={session.user?.image ?? ''}
                height={30}
                width={30}
                style={{
                  float: 'right',
                  borderRadius: '10px',
                }}
                alt=""
                onClick={handleClick}
              />
            </Tooltip>
          ) : (
            <Button
              style={{ float: 'right', height: '30px' }}
              onClick={() => signIn()}
              variant="outlined"
            >
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
