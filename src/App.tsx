import { useState } from "react";
import "./App.css";
import TextEditor from "./modules/TextEditor";
import { LetterDocument, LetterFile } from "./types/Types";
import DocumentSidebar from "./modules/DocumentSidebar";
import Button from "./modules/Button";
import { File } from "react-feather";
import FileDropdown from "./modules/FileDropdown";

const App = () => {
  const [currentDocument, setCurrentDocument] = useState(0);
  const [letterFile, setLetterFile] = useState<LetterFile>({
    title: "Hello Letter",
    documents: [
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
    ],
  });

  const onChange = (newValue: LetterDocument["value"]) => {
    const documentsCopy = [...letterFile.documents];
    documentsCopy[currentDocument].value = newValue;
    setLetterFile((lf) => ({ ...lf, documents: documentsCopy }));
  };

  return (
    <div className="App absolute top-0 left-0 h-full w-full flex flex-col">
      <div className="p-3 border-b border-gray-200 flex gap-4 items-center">
        <FileDropdown
          new={() =>
            setLetterFile({
              title: "New Document",
              documents: [{ title: "New document", value: [] }],
            })
          }
          open={() => {}}
          save={() => {}}
          about={() => alert("LetterEditor pre-alpha - Please don't use this")}
        />
        <h1 className="text-lg font-bold">Letter</h1>
        {/* <Button color="secondary" size="small" icon={<File />} /> */}
      </div>
      <div className="w-full h-full flex">
        <DocumentSidebar
          documents={letterFile.documents}
          setDocuments={() => (nd: LetterFile["documents"]) =>
            setLetterFile((lf) => ({ ...lf, documents: nd }))}
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
        />
        <TextEditor
          value={letterFile.documents[currentDocument].value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default App;
