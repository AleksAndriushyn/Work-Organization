import { useSession } from 'next-auth/react'
import { useState } from 'react'
import Header from './Header'
import UserPopup from './UserPopup'

const Layout = ({ children }: { children: JSX.Element }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { data: session } = useSession()

  return (
    <>
      <Header anchorEl={anchorEl} session={session} setAnchorEl={setAnchorEl} />
      {children}
      <UserPopup session={session} anchorEl={anchorEl} />
      {/* {isOpen && (
        <AuthenticationDialog open={isOpen} onClose={() => setIsOpen(false)} />
      )} */}
    </>
  )
}
export default Layout
