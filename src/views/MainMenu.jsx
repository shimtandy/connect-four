import styles from './MainMenu.module.css';
import logo from '../assets/images/logo.svg';
import pvp from '../assets/images/player-vs-player.svg';
import { Link } from 'react-router';

export default function MainMenu() {
    return (
        <div className={styles.viewContainer}>
            <div className={styles.menu}>
                <img src={logo} alt='logo' className={styles.logo} />
                <Link to='/play/pvp' className='linkButton linkButtonYellow'>
                    Player vs Player
                    <img src={pvp} alt='' />
                </Link>
                <Link to='/rules' className='linkButton linkButtonWhite'>Game Rules</Link>
            </div>
        </div>
    )
}