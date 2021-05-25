import ReactQuill, { Value } from "react-quill";
import "quill/dist/quill.snow.css";
import { ChangeEvent, useRef, useState } from "react";
import { Format } from "../types/Editor";

const toolbar = [
  [{ header: [1, 2, false] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ header: 1 }, { header: 2 }, "blockquote", "code"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  [{ align: [] }, { direction: "ltr" }],
  ["link", "image", "video" /* , "formula" */],
  ["clean"],
];

const TextEditor = () => {
  const [value, setValue] = useState<Value>();
  const [debug, setDebug] = useState(false);
  const [format, setFormat] = useState<Format>();
  const quill = useRef<ReactQuill>(null);

  const onChange = () => setValue(quill.current?.editor?.getContents());
  const onDebugChange = ({ target }: ChangeEvent<HTMLInputElement>) =>
    setDebug(target.checked);

  return (
    <>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        ref={quill}
        modules={{
          toolbar,
        }}
        onChangeSelection={(selection, sources, editor) => {
          setFormat(selection ? quill.current?.editor?.getFormat() : {});
          console.log(selection, sources, editor);
        }}
      />
      <div className="space-x-2">
        <input
          type="checkbox"
          checked={debug}
          onChange={onDebugChange}
          id="debug-checkbox"
        />
        <label htmlFor="debug-checkbox">Debug</label>
      </div>
      {debug ? (
        <div className="prose">
          <pre>{JSON.stringify(format, null, "  ")}</pre>
          <pre>{JSON.stringify(value, null, "  ")}</pre>
        </div>
      ) : null}
    </>
  );
};

export default TextEditor;
