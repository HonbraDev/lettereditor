import ReactQuill, { Value } from "react-quill";
import "quill/dist/quill.snow.css";
import { useRef, useState } from "react";
import { DeltaOperation } from "quill";
import { Format } from "../types/Types";

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
  value: DeltaOperation[];
  onChange: (newValue: DeltaOperation[]) => any;
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
            quill.current?.editor?.getContents().ops as DeltaOperation[]
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
