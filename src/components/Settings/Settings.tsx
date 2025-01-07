import styles from './Settings.module.scss';
import settingsIcon from '../../assets/icon-settings.svg';
export default function Settings () {
    return (
        <div className={styles.container}>
            <img className={styles.settings_icon} src={settingsIcon} alt="settings icon" />
        </div>
    )
}