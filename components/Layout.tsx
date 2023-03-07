import Header from './Header'

const Layout = ({ children }: { children: JSX.Element }) => {
  // const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <>
      <Header />
      {children}
      {/* {isOpen && (
        <AuthenticationDialog open={isOpen} onClose={() => setIsOpen(false)} />
      )} */}
    </>
  )
}
export default Layout
