import Link from "next/link"
import ToggleTheme from "@/components/ToggleTheme"
import styles from '@/styles/Navigation.module.css'

const Navigation = () => {
  return (
    <div className={`bg-background ${styles.navigationContainer}`}>
      <nav className={`bg-background ${styles.navigationBar}`}>
        <h1 className={styles.navigationTitle}>Portfolio</h1>

        <ul className={styles.navigationMenu}>
          <li>
            <Link href="/" className={styles.navigationLink}>Home</Link>
          </li>
          <li>
            <Link href="#about" className={styles.navigationLink}>About</Link>
          </li>
        </ul>

        <ToggleTheme />
      </nav>
    </div>
  )
}

export default Navigation