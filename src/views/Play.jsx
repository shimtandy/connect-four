import styles from './play.module.css';
import logo from '../assets/images/logo.svg';
import player1 from '../assets/images/you.svg';
import player2 from '../assets/images/cpu.svg';
import gridFront from '../assets/images/grid-front-layer.svg';
import gridBack from '../assets/images/grid-back-layer.svg';
import { useState } from 'react';

export default function Play() {
    let [player1Score, setPlayer1Score] = useState(0);
    let [player2Score, setPlayer2Score] = useState(0);
    let [currentTurn, setCurrentTurn] = useState(1);
    let [winner, setWinner] = useState(0);

    return (
        <div className={styles.viewContainer}>
            <div className={styles.paddedSection}>
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
                    <div className={styles.grid}>
                        <img className={styles.gridBack} src={gridBack} alt='' />
                        <img className={styles.gridFront} src={gridFront} alt='' />
                    </div>
                </main>
            </div>
            <div className={styles.playerIndicator}>
                {!winner && <p>Player 1s turn</p>}
                {winner !== 0 && <p>Winner!</p>}
            </div>
            

        </div>
    )
}