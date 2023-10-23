import {useEffect, useState} from "react";

const useLimit = (initialValue, startLimit, endLimit) => {
    const
        [value, setValue] = useState(initialValue),
        [error, setError] = useState(false);
    function handleChange(e) {
        setValue(+e.target.value)
    }
    useEffect(() => {
        if (value < startLimit) setValue('')
        else if (value > endLimit) setError(true)
        else setError(false)
    }, [value])

    return [value, handleChange, error, setError];
}

export default useLimit