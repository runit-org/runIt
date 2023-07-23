import { useState } from "react";

export function useHandleChange(initialValue) {
  const [formValue, setFormValue] = useState(initialValue);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  /* return [
    formValue,
    setFormValue,
    function (e) {
      setFormValue({ ...formValue, [e.target.name]: e.target.value });
    },
  ]; */

  return {
    formValue,
    setFormValue,
    handleFieldChange: handleChange,
  };
}
