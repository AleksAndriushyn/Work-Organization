import { useUser } from '@auth0/nextjs-auth0/client'
import { Box, Toolbar, Tooltip } from '@mui/material'
import Image from 'next/image'
import { useState } from 'react'
import AuthorizationButton from '../AuthorizationButton'
import Navbar from './Navbar'
import UserPopup from './UserPopup'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { isLoading, user } = useUser()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  return (
    <header
      style={{
        zIndex: 1,
        backgroundColor: '#212529',
        width: '100%',
        top: 0,
        position: 'fixed',
      }}
    >
      <Toolbar>
        <Navbar />
        <Box style={{ width: '100%' }}>
          {isLoading ? (
            <p style={{ color: 'white' }}>Loading...</p>
          ) : user ? (
            <Tooltip title={user?.name}>
              <Image
                src={user?.picture ?? ''}
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
            <AuthorizationButton href='/api/auth/login'>
              Login
            </AuthorizationButton>
          )}
        </Box>
      </Toolbar>
      <UserPopup user={user} anchorEl={anchorEl} />
    </header>
  )
}

export default Header
