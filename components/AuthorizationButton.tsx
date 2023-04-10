import { Button } from '@mui/material'
import styles from '../styles/AuthorizationButton.module.scss'
type ColorType =
  | 'inherit'
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
const AuthorizationButton = ({
  color,
  href,
  children,
}: {
  color?: ColorType
  href: string
  children: string
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
