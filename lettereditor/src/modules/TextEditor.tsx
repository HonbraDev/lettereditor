import ReactQuill, { Value } from "react-quill";
import "quill/dist/quill.snow.css";
import { useRef } from "react";
import { DeltaOperation } from "quill";

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

  return (
    <>
      <ReactQuill
        theme="snow"
        value={{ ops: value } as Value}
        onChange={(_string, _delta, source) => {
          if (source === "api") return;
          onChange(
            quill.current?.editor?.getContents().ops as DeltaOperation[]
          );
        }}
        ref={quill}
        modules={{
          toolbar,
        }}
        /*  onChangeSelection={(selection, sources, editor) => {
          setFormat(selection ? quill.current?.editor?.getFormat() : {});
          console.log(selection, sources, editor);
        }} */
      />
    </>
  );
};

export default TextEditor;
