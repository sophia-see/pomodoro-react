import { Mode } from '../../App';
import logo from '../../assets/logo.svg';
import styles from './Header.module.scss';

interface HeaderProps {
    currentMode: Mode;
    setCurrentMode: React.Dispatch<React.SetStateAction<Mode>>;
}
export default function Header ({ currentMode, setCurrentMode }: HeaderProps) {
    return (
        <header>
            <nav className={styles.navbar}>
                <img src={logo} alt="pomodoro logo" />
                <ul className={styles.mode_list}>
                    {Object.keys(Mode).map((mode) => {
                        const isActive = currentMode === mode;

                        return (
                            <li
                                key={mode}
                                className={`${styles.mode_item} ${isActive ? styles.active : ''}`}
                                onClick={() => setCurrentMode(mode as Mode)}
                            >
                                {mode.replace('_', ' ')}
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </header>
    )
}