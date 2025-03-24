import { createContext, useState } from "react"

export const FormContext = createContext(null)

export const FormContextProvider = ({ children }) => {
    const [value, setValue] = useState('');
    const [age, setAge] = useState(20);
    const [email, setEmail] = useState('abc@gmail.com');
    const [intrests, setIntrest] = useState([]);
    const [settings, setSettings] = useState({ theme: 'dark' });
    const [error, setError] = useState({})

    return (
        <FormContext.Provider value={{ value, setValue, age, setAge, email, setEmail, intrests, setIntrest, settings, setSettings, error, setError }}>
            {children}
        </FormContext.Provider>
    )
}