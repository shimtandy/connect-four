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
            <header className={styles.header}>
                <button className={styles.menuButton}>Menu</button>
                <img src={logo} className={styles.logo} alt='Connect Four logo' />
                <button className={styles.restartButton}>Restart</button>
            </header>
            <main className={styles.contentContainer}>
                <div className={styles.gridAndScores}>
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
                </div>
                {!winner &&
                    <div className={styles.indicatorSection}>
                        <div className={styles.indicator}>
                            <svg className={styles.indicatorImage} width="197" height="165" viewBox="0 0 197 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g filter="url(#filter0_d_5_3228)">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 55.2795C3 47.2326 7.82258 39.9694 15.2389 36.8468L90.2793 5.25082C95.2186 3.17114 100.786 3.16075 105.733 5.22198L181.692 36.8718C189.145 39.9772 194 47.2593 194 55.3333V132C194 143.046 185.046 152 174 152H23C11.9543 152 3 143.046 3 132V55.2795Z" fill="#FD6687" />
                                    <path d="M14.6568 35.4643C6.68427 38.8212 1.5 46.6291 1.5 55.2795V132C1.5 143.874 11.1259 153.5 23 153.5H174C185.874 153.5 195.5 143.874 195.5 132V55.3333C195.5 46.6538 190.281 38.8255 182.269 35.4872L106.31 3.83737C100.992 1.62154 95.0069 1.63271 89.6972 3.86836L14.6568 35.4643Z" stroke="black" stroke-width="3" />
                                </g>
                                <defs>
                                    <filter id="filter0_d_5_3228" x="0" y="0.683594" width="197" height="164.316" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                        <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="10" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_5_3228" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_5_3228" result="shape" />
                                    </filter>
                                </defs>
                            </svg>
                            <div className={styles.indicatorText}>
                                <div className={styles.indicatorPlayerNumber}>Player 1s Turn</div>
                                <div className={styles.timeLeft}>10s</div>
                            </div>
                        </div>
                    </div>
                }
                {winner !== 0 && <p>Winner!</p>}
                </main>
        </div>
    )
}