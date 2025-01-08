import styles from './Settings.module.scss';
import settingsIcon from '../../assets/icon-settings.svg';
import closeIcon from '../../assets/icon-close.svg';
import arrowUpIcon from '../../assets/icon-arrow-up.svg';
import arrowDownIcon from '../../assets/icon-arrow-down.svg';

import { ColorType, FontType, SettingsType } from '../../App';
import React from 'react';

interface SettingsProps {
    timeSettings: SettingsType;
    setTimeSettings: React.Dispatch<React.SetStateAction<SettingsType>>;
    fontSettings: FontType;
    setFontSettings: React.Dispatch<React.SetStateAction<FontType>>;
    colorSettings: ColorType;
    setColorSettings: React.Dispatch<React.SetStateAction<ColorType>>;
}

export default function Settings (props: SettingsProps) {
    const { 
        timeSettings, 
        setTimeSettings, 
        fontSettings, 
        setFontSettings, 
        colorSettings, 
        setColorSettings 
    } = props;
    const [isModalOpened, setIsModalOpened] = React.useState(false);
    const [tempTimeSettings, setTempTimeSettings] = React.useState(timeSettings);
    const [tempFontSettings, setTempFontSettings] = React.useState(fontSettings);
    const [tempColorSettings, setTempColorSettings] = React.useState(colorSettings);

    const onApplySettings = () => {
        setTimeSettings(tempTimeSettings);
        setFontSettings(tempFontSettings);
        setColorSettings(tempColorSettings);
    }

    const renderTimeSettings = (
        <div className={styles.setting_container}>
            <div className={styles.setting_title}>time (minutes)</div>
            <div className={styles.time_settings}>
                {Object.entries(timeSettings).map(([key, value]) => {
                    return (
                        <div className={styles.time_row}>
                            <div className={styles.time_label}>{key.replace("_"," ")}</div>
                            <div className={styles.input_container}>
                                <input 
                                    type="number" 
                                    name={key} 
                                    id={key} 
                                    defaultValue={value} 
                                    className={styles.time_value}
                                />
                                <div className={styles.buttons}>
                                    <button className={styles.input_btn}>
                                        <img src={arrowUpIcon} alt="up icon" />
                                    </button>
                                    <button className={styles.input_btn}>
                                        <img src={arrowDownIcon} alt="down icon" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );

    const renderFontSettings = (
        <div className={styles.setting_container}>
            <div className={styles.setting_title}>font</div>
            <div className={styles.row_setting}>
                {Object.values(FontType).map(font => {
                    const isActive = tempFontSettings == font;
                    const activeStyle = isActive ? styles.active : "";
                    return (
                        <div 
                            className={`${styles.font_item} ${styles[font]} ${activeStyle}`}
                            onClick={() => setTempFontSettings(font)}
                        >
                            Aa
                        </div>
                    )
                })}
            </div>
        </div>
    );

    const renderColorSettings = (
        <div className={`${styles.setting_container} ${styles.no_divider}`}>
            <div className={styles.setting_title}>color</div>
            <div className={styles.row_setting}>
                {Object.values(ColorType).map(color => {
                    const isActive = tempColorSettings == color;
                    const content = isActive ? <span>&#10003;</span> : "";
                    return (
                        <div 
                            className={`${styles.color_item} ${styles[color]}`}
                            onClick={() => setTempColorSettings(color)}
                        >
                            {content}
                        </div>
                    )
                })}
            </div>
        </div>
    );

    return (
        <>
            <div className={styles.container}>
                <img className={styles.settings_icon} src={settingsIcon} alt="settings icon" onClick={() => setIsModalOpened(true)}/>
            </div>    
            <div className={`${styles.modal_container} ${isModalOpened ? "" : styles.hidden}`}>
                <div className={styles.modal}>
                    <div className={styles.modal_title}>
                        <div className={styles.settings_title}>Settings</div>    
                        <img className={styles.close_icon} src={closeIcon} alt="close icon" onClick={() => setIsModalOpened(false)}/>
                    </div>
                    <div className={styles.modal_contents}>
                        {renderTimeSettings}
                        {renderFontSettings}
                        {renderColorSettings}
                    </div>
                    <div className={styles.btn_container}>
                        <button className={styles.apply_btn} onClick={onApplySettings}>Apply</button>
                    </div>
                </div>
            </div>    
        </>

    )
}