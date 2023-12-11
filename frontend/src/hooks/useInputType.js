import { useState } from "react";

export function useInputType() {
  const [inputType, setInputType] = useState("password");

  const handleInputType = () => {
    inputType === "password" ? setInputType("text") : setInputType("password");
  };

  return { inputType, handleInputType };
}
