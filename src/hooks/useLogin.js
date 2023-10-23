import {useEffect, useState} from "react";

const useLogin = () => {
    const
        [value, setValue] = useState(''),
        [error, setError] = useState(false);
    const handleChange = e => {
        setValue(e.target.value)
    }
    const checkPhone = () => {
        let number = value.match(/(\+|7|8|9)\s?\(?\d?(7|8|9)(.){9,}/g);
        if (number && number[0].match(/[a-zA-Z]/)) {
            setError(true)
        } else setError(false)
    }
    useEffect(() => {
        checkPhone()
    }, [value])
    return [value, handleChange, error, setError];
}

export default useLogin