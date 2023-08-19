import React, { useState, useRef, useEffect } from "react";
import { TypeNotes } from "@/utils/types/Notes";
import { useUpdateNote } from "@/features/mutations/useNotes";

const EditableNote = (props: TypeNotes) => {
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const {
    mutate: updateNote,
    isLoading: isUpdateNote,
    error: updateNoteError,
  } = useUpdateNote(props.id);

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.textContent = title;
    }
    if (contentRef.current) {
      contentRef.current.textContent = content;
    }
  }, [title, content]);

  const handleTitleInput = (event: React.FormEvent<HTMLHeadingElement>) => {
    const inputValue = event.currentTarget.textContent || "";
    setTitle(inputValue || "Untitled");

    // Set the cursor position to the beginning
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.setStart(titleRef.current!, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleContentInput = (event: React.FormEvent<HTMLParagraphElement>) => {
    const inputValue = event.currentTarget.textContent || "";
    setContent(inputValue);

    // Set the cursor position to the beginning
    const selection = window.getSelection();
    if (selection) {
      const range = document.createRange();
      range.setStart(contentRef.current!, 0);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleTitleFocus = (event: React.FocusEvent<HTMLHeadingElement>) => {
    const inputValue = event.currentTarget.textContent || "";
    const placeholder = event.currentTarget.getAttribute("data-placeholder");
    if (inputValue === placeholder) {
      event.currentTarget.textContent = "";
    }
  };

  const handleContentFocus = (
    event: React.FocusEvent<HTMLParagraphElement>
  ) => {
    const inputValue = event.currentTarget.textContent || "";
    const placeholder = event.currentTarget.getAttribute("data-placeholder");
    if (inputValue === "") {
      event.currentTarget.textContent = placeholder || "No content";
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLHeadingElement | HTMLParagraphElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (event.currentTarget === titleRef.current) {
        contentRef.current?.focus();
      } else {
        contentRef.current?.blur();
      }
    }
  };

  const handleBlur = () => {
    updateNote({
      title,
      content,
    });
  };

  return (
    <>
      <h1
        data-content-editable-leaf="true"
        contentEditable
        ref={titleRef}
        onInput={handleTitleInput}
        onFocus={handleTitleFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        data-placeholder="Untitled"
        style={{ outline: "none" }}
        suppressContentEditableWarning
      ></h1>
      <p
        contentEditable
        ref={contentRef}
        onInput={handleContentInput}
        onFocus={handleContentFocus}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        data-placeholder="No content"
        style={{ outline: "none" }}
        suppressContentEditableWarning
      ></p>
    </>
  );
};

export default EditableNote;
