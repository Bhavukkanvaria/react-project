export const Interests = ({data, setData, errors}) => {
    const { interests, setIntrest } = data;

    const onCodingChange = (e, name) => {
        if (e.target.checked) {
            setData((prev)=> ({...prev, interests:[...prev.interests, name]}))
        } else {
            let newState = interests.filter((interest) => interest != name)
            setIntrest((prev)=>({...prev, interests:newState}));
        }
    }

    return (
        <div className="tabs intrest">
            <div className="coding">
                <label>
                    <input type="checkbox"
                        checked={interests.includes('coding')}
                        name="coding"
                        onChange={(e) => onCodingChange(e, 'coding')} />
                    Coding
                </label>
            </div>
            <div className="music">
                <label>
                    <input type="checkbox"
                        checked={interests.includes('music')}
                        name="music"
                        onChange={(e) => onCodingChange(e, 'music')} />
                    Music
                </label>
            </div>
            <div className="javaScript">
                <label>
                    <input type="checkbox"
                        checked={interests.includes('javascript')}
                        name="javascript"
                        onChange={(e) => onCodingChange(e, 'javascript')} />
                    Javascript
                </label>
            </div>
            {errors?.interest && <span className="error">{errors.interest}</span>}
        </div>
    )
}