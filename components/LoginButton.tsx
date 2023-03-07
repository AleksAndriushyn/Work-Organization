import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'
import styles from '../styles/LoginButton.module.scss'

const LoginButton = () => {
  return (
    <Button className={styles.loginButton} onClick={() => signIn()}>
      Login
    </Button>
  )
}

export default LoginButton
