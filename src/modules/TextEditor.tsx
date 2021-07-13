import ReactQuill, { Value } from "react-quill";
import "quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { Format, LetterDocument } from "../types/Types";

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

const TextEditor = ({
  value,
  onChange,
}: {
  value: LetterDocument["value"];
  onChange: (newValue: LetterDocument["value"]) => any;
}) => {
  const quill = useRef<ReactQuill>(null);
  const [, setFormats] = useState<Format>({});

  return (
    <>
      <ReactQuill
        theme="snow"
        value={{ ops: value } as Value}
        onChange={(_string, delta, source) => {
          if (source === "api") return;
          console.log(source, delta);
          onChange(
            quill.current?.editor?.getContents().ops as LetterDocument["value"]
          );
        }}
        ref={quill}
        modules={{
          toolbar,
        }}
        onChangeSelection={(selection) => {
          // TODO:fix #1 bug with multiple character selection
          setFormats(
            (selection
              ? quill.current?.editor?.getFormat()
              : {}) as unknown as Format
          );
          console.log(
            "iwanttodie",
            selection ? quill.current?.editor?.getFormat() : {}
          );
        }}
      />
    </>
  );
};

export default TextEditor;
