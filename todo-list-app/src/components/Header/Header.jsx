'use client'

import styles from './Header.module.css'
import { useRouter } from 'next/navigation'

const Header = () => {

  const router = useRouter()

  return (
    <header className={styles.headerContainer}>
      <p className={styles.signOut} onClick={() => router.push('/login')}>Sign out</p>
    </header>
  )
}

export default Header
