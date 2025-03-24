export const Profile = ({data, setData, errors}) => {

    const {name, age,  email} = data;

    const onNameChange = (e) => {
        setData((prev)=>({...prev, name: e.target.value}))
    }
    const onAgeChange = (e) => {
        setData((prev)=>({...prev, age: e.target.value}))
    }
    const onEmailChange = (e) => {
        setData((prev)=>({...prev, email: e.target.value}))
    }

    return (
        <div className="tabs profile">
            <div className="name">
                <label>Name:</label>
                <input type="text" value={name} onChange={onNameChange} />
                {errors?.name && <span className="error">{errors.name}</span>}
            </div>
            <div className="age">
                <label>Age:</label>
                <input type="number" value={age} onChange={onAgeChange} />
                {errors?.age && <span className="error">{errors.age}</span>}
            </div>
            <div className="email">
                <label>Email:</label>
                <input type="text" value={email} onChange={onEmailChange} />
                {errors?.email && <span className="error">{errors.email}</span>}
            </div>
        </div>
    )
}