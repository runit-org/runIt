import { useState } from "react";

export function useHandleChange(initialValue) {
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e) => {
    let targetValue = e.target.value;
    // custom for create event form
    if (e.target.name === "maxMember") {
      targetValue = parseInt(targetValue);
    }
    setFormValue({ ...formValue, [e.target.name]: targetValue });
  };

  return {
    formValue,
    setFormValue,
    handleFieldChange: handleChange,
  };
}
