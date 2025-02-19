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
                    <img src={tickButton} alt='return to menu' />
                </Link>
            </div>
        </div>
        
    )
}