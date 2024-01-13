import { useLayoutEffect } from "react";

const useAutoSizeTextArea = (
  id: string,
  textAreaRef: HTMLTextAreaElement | null,
  value: string
) => {
  useLayoutEffect(() => {
    const textArea = textAreaRef ?? document.getElementById(id);

    if (textArea) {
      textArea.style.height = "0px";
      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, id, value]);
};

export default useAutoSizeTextArea;
