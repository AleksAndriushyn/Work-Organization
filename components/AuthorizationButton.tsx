import { Button } from '@mui/material'
import styles from '../styles/AuthorizationButton.module.scss'

const AuthorizationButton = ({
  color,
  href,
  children
}: {
  color?: string
  href: string
  children:string
}) => {
  return (
    <Button
      variant="outlined"
      color={color ?? 'primary'}
      className={color === 'error' ? styles.logoutButton : styles.loginButton}
      href={href}
    >
      {children}
    </Button>
  )
}

export default AuthorizationButton
