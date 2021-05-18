import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import { useRef, useState } from "react";

const TextEditor = () => {
  const [value, setValue] = useState<ReactQuill.Value>();
  const quill = useRef<ReactQuill>(null);

  const onChange = () => {
    setValue(quill.current?.editor?.getContents());
  };

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        ref={quill}
        modules={{
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ header: 1 }, { header: 2 }, "blockquote", "code"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            [{ align: [] }, { direction: "ltr" }],
            ["link", "image", "video" /* , "formula" */],
            ["clean"],
          ],
        }}
      />
      <p className="whitespace-pre font-mono text-sm">
        {JSON.stringify(value, null, "  ")}
      </p>
      <button
        onClick={() => {
          quill.current?.editor?.setText("hello your computer has virus");
        }}
      >
        customer
      </button>
    </>
  );
};

export default TextEditor;
