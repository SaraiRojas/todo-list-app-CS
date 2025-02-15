import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <p className={styles.signOut}>Sign out</p>
    </header>
  )
}

export default Header
