import { useState } from "react";

const useCheckbox = initialValue => {
    const [value, setValue] = useState(initialValue);
    function handleChange(e) {
        setValue(!!e.target.checked)
    }
    return [value, handleChange];
}

export default useCheckbox