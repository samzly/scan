import {useEffect, useState} from "react";

const usePassword = () => {
    const
        [value, setValue] = useState(''),
        [error, setError] = useState(false);
    const specialChars = /^[^ \\]*$/;
    const handleChange = e => {
        setValue(e.target.value);
    }
    useEffect(() => {
        setError(!specialChars.test(value))
    }, [value])
    return [value, handleChange, error, setError];
}

export default usePassword