import { Link } from 'react-router';
import styles from './rules.module.css';
import tickButton from '../assets/images/tick.svg';

export default function Rules() {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.contentContainer}>
                <h1>Rules</h1>
                <h2>Objective</h2>
                <p>Be the first player to connect 4 of the same colored discs in a row (either vertically, horizontally, or diagonally).</p>
                <h2>How To Play</h2>
                <ol>
                    <li>Red goes first in the first game.</li>
                    <li>Players must alternate turns, and only one disc can be dropped in each turn.</li>
                    <li>The game ends when there is a 4-in-a-row or a stalemate.</li>
                    <li>The starter of the previous game goes second on the next game.</li>
                </ol>
                <Link to='/' >
                    {/* TODO: Add text version of button for accessibility */}
                    <svg width="70" height="75" viewBox="0 0 70 75" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="Group 2">
                            <g id="Oval Copy 11">
                                <circle cx="35" cy="35" r="32" fill="#FD6687" />
                                <circle id="tickCircleBorder" cx="35" cy="35" r="33.5" stroke="black" stroke-width="3" />
                            </g>
                            <path id="Path" d="M20 34.5819L30.264 44.846L50.11 25" stroke="white" stroke-width="3" />
                        </g>
                    </svg>
                </Link>
            </div>
        </div>
        
    )
}