import { useState } from "react";

const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);
    const handleChange = e => {
        setValue(e.target.value.trim())
    }
    return [value, handleChange];
}

export default useInput