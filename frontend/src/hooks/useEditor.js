import { useState } from "react";

export function useEditor(initialValue) {
  const [editorMode, setEditorMode] = useState(initialValue);

  function handleClick() {
    setEditorMode(!editorMode);
  }

  return { editorMode, setEditorMode, handleClick };
}
