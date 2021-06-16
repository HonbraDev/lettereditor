import { useState } from "react";
import { DeltaOperation } from "quill";
import "./App.css";
import TextEditor from "./modules/TextEditor";
import { LetterDocument } from "./types/Types";
import DocumentSidebar from "./modules/DocumentSidebar";

const App = () => {
  const [currentDocument, setCurrentDocument] = useState(0);
  const [documents, setDocuments] = useState<LetterDocument>([
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

  const onChange = (newValue: DeltaOperation[]) => {
    const documentsCopy = [...documents];
    documentsCopy[currentDocument].value = newValue;
    setDocuments(documentsCopy);
  };

  return (
    <div className="App absolute top-0 left-0 h-full w-full flex flex-col">
      <div className="p-3 border-b border-gray-200">
        <h1 className="text-lg font-bold">Letter</h1>
      </div>
      <div className="w-full h-full flex">
        <DocumentSidebar
          documents={documents}
          setDocuments={setDocuments}
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
        />
        <TextEditor
          value={documents[currentDocument].value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default App;
