import { useEffect, useRef } from 'react'
import styles from './disk.module.css'

export default function Disk({gridX, gridY, cellSize=50, player}) {
    const elementRef = useRef(null)

    useEffect(() => {
        elementRef.current.style.top = gridY * cellSize + 'px'
        elementRef.current.style.transition = 'top 1s linear'
    }, [])

    return (
        <div 
            className={styles.disk + ' ' + (player == 1 ? styles.player1 : styles.player2)}
            ref={elementRef} 
            style={{left: cellSize * gridX + 'px'}}>
        </div>
    )
}