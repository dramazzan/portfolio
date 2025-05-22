'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import styles from '@/styles/ToggleTheme.module.css'

const ToggleTheme = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    return (
        <div>
            <button 
                className={styles.themeToggleButton}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </div>
    )
}


export default ToggleTheme