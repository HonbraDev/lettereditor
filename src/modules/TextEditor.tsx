import ReactQuill, { Value } from "react-quill";
import "quill/dist/quill.snow.css";
import { Dispatch, FC, SetStateAction, useRef } from "react";
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

const TextEditor: FC<{
  value: LetterDocument["value"];
  onChange: (newValue: LetterDocument["value"]) => any;
  formats: Format;
  setFormats: Dispatch<SetStateAction<Format>>;
}> = ({ value, onChange, setFormats }) => {
  const quill = useRef<ReactQuill>(null);

  return (
    <>
      <ReactQuill
        theme=""
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
