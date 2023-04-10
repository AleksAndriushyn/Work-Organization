import Header from './header/Header'

const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}
export default Layout
