import Link from 'next/link'
import { useState } from 'react'

const MENU_LIST = [
  { text: 'Companies', href: '/companies/Companies' },
  { text: 'Contact', href: '/contact' }
]

const Navbar = () => {
  const [activeIdx, setActiveIdx] = useState(-1)
  return (
    <header>
      <nav style={{ margin: '10px' }}>
        <Link
          href={'/'}
          onClick={() => {
            setActiveIdx(-1)
          }}
        >
          Work Organization
        </Link>
        <div
          style={{
            float: 'right',
            marginRight: '200px'
          }}
        >
          <div style={{ display: 'flex' }}>
            <Link
              href={'/'}
              onClick={() => {
                setActiveIdx(-1)
              }}
            >
              Home
            </Link>
            {MENU_LIST.map((menu, idx) => (
              <div
                onClick={() => {
                  setActiveIdx(idx)
                }}
                style={
                  activeIdx === idx
                    ? {
                        marginLeft: '10px',
                        textDecoration: 'underline'
                      }
                    : { marginLeft: '10px' }
                }
                key={menu.text}
              >
                <Link href={menu.href}>{menu.text}</Link>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
