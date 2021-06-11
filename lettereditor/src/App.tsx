import { DeltaOperation } from "quill";
import { useState } from "react";
import "./App.css";
import TextEditor from "./modules/TextEditor";

const App = () => {
  const [documents, setDocuments] = useState<
    { title: string; value: DeltaOperation[] }[]
  >([
    {
      title: "Hello",
      value: [
        { insert: "Hello, how are you? I am " },
        { attributes: { bold: true }, insert: "under the water" },
        { insert: ". Please " },
        { attributes: { italic: true }, insert: "help me" },
        { insert: ", there’s " },
        { attributes: { underline: true }, insert: "too much" },
        { insert: " raining!\nWoo!" },
        { attributes: { blockquote: true }, insert: "\n" },
        { insert: "\n" },
      ],
    },
    {
      title: "How are you",
      value: [{ insert: "How are you" }],
    },
  ]);
  const [currentDocument, setCurrentDocument] = useState(0);

  const onChange = (newValue: DeltaOperation[]) => {
    const documentsCopy = [...documents];
    documentsCopy[currentDocument].value = newValue;
    setDocuments(documentsCopy);
  };

  return (
    <div className="App absolute top-0 left-0 h-full w-full flex flex-row">
      <ul className="flex flex-col border-r border-gray-200 ">
        {documents.map((doc, index) => (
          <li
            className={`px-3 py-2 cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap w-56 text-sm ${
              index === currentDocument
                ? "bg-gray-100 hover:bg-gray-200"
                : "hover:bg-gray-100"
            }`}
            key={index}
            onClick={() => setCurrentDocument(index)}
          >
            {doc.title}
          </li>
        ))}
        <input type="text" />
      </ul>
      <TextEditor
        value={documents[currentDocument].value}
        onChange={onChange}
      />
    </div>
  );
};

export default App;
