export const Settings = ({data, setData}) => {
    const { settings } = data;
    
        const onCodingChange = (theme) => {
            setData((prev)=> ({...prev, settings:{...prev.settings, theme: theme}}))
        }
    
        return (
            <div className="tabs settins">
                <div className="theme">
                    <label>
                        <input type="radio"
                            name="settings"
                            checked={settings?.theme === 'dark'}
                            onChange={() => onCodingChange('dark')} />
                        Dark
                    </label>
                </div>
                <div className="theme">
                    <label>
                        <input type="radio"
                            name="settings"
                            checked={settings?.theme === 'light'}
                            onChange={() => onCodingChange('light')} />
                        Light
                    </label>
                </div>
            </div>
        )
}