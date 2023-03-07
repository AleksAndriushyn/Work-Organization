import { Box, Toolbar, Tooltip } from '@mui/material'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useState } from 'react'
import LoginButton from './LoginButton'
import Navbar from './Navbar'
import UserPopup from './UserPopup'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: session } = useSession()
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }
  return (
    <>
      <Box
        style={{
          zIndex: 9999,
          backgroundColor: '#212529',
          width: '100%',
          top: 0,
          position: 'fixed',
        }}
      >
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
              <LoginButton />
            )}
          </Box>
        </Toolbar>
      </Box>
      <UserPopup session={session} anchorEl={anchorEl} />
    </>
  )
}

export default Header
