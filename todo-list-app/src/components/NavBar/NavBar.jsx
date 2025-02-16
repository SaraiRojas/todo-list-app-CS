'use client'
import styles from './NavBar.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const currentPath = usePathname()

  return (
    <nav className={styles.navContainer}>
      <ul className={styles.navigation}>
        <li
          className={`${styles.navOption} ${currentPath === '/pending' && styles.selected}`}
        >
          <Link href="/pending">Pending</Link>
        </li>

        <li
          className={`${styles.navOption} ${currentPath === '/completed' && styles.selected}`}
        >
          <Link href="/completed">Completed</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
