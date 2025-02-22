import { useEffect, useRef } from 'react'
import styles from './disk.module.css'

export default function Disk({gridX, gridY, cellSize}) {
    const elementRef = useRef(null)

    useEffect(() => {
        elementRef.current.style.top = '200px'
        elementRef.current.style.transition = 'top 1s linear'
    }, [])

    return (
        <div className={styles.disk} ref={elementRef} style={{left: cellSize * gridX}}></div>
    )
}