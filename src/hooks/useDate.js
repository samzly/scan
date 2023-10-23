import {useEffect, useState} from "react";

const useDate = () => {
    const
        [error, setError] = useState(false),
        [startDate, setStartDate] = useState(''),
        [endDate, setEndDate] = useState('');
    const currentDate = (new Date).getTime();
    const handleStart = e => {
        setStartDate(e.target.value)
    }
    const handleEnd = e => {
        setEndDate(e.target.value)
    }
    const checkDate = () => {
        if (startDate && endDate) {
            const start = (new Date(startDate)).getTime();
            const end = (new Date(endDate)).getTime();
            return start && start <= end && end <= currentDate;
        }
        return false
    }

    useEffect(() => {
        if (checkDate() || !startDate || !endDate) {
            setError(false)
        }
        else setError(true)
    }, [startDate, endDate])
    return [startDate, handleStart, endDate, handleEnd, error, setError];
}

export default useDate