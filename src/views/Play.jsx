import styles from './play.module.css';
import logo from '../assets/images/logo.svg';
import player1 from '../assets/images/you.svg';
import player2 from '../assets/images/cpu.svg';
import { useState } from 'react';

export default function Play() {
    let [player1Score, setPlayer1Score] = useState(0);
    let [player2Score, setPlayer2Score] = useState(0);

    return (
        <div className={styles.viewContainer}>
            <header className={styles.header}>
                <button className={styles.menuButton}>Menu</button>
                <img src={logo} className={styles.logo} alt='Connect Four logo' />
                <button className={styles.restartButton}>Restart</button>
            </header>
            <main className={styles.contentContainer}>
                <div className={styles.scoreCard}>
                    <div className={styles.playerNumber}>Player 1</div>
                    <div className={styles.playerScore}>{player1Score}</div>
                    <img src={player1} alt='' />
                </div>
                <div className={styles.scoreCard + ' ' + styles.scoreCardRHS}>
                    <div className={styles.playerNumber}>Player 2</div>
                    <div className={styles.playerScore}>{player2Score}</div>
                    <img src={player2} alt='' />
                </div>
            </main>
        </div>
    )
}