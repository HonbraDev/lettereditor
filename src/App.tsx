import { useRef, useState } from "react";
import "./App.scss";
import TextEditor from "./modules/TextEditor";
import { Format, LetterDocument, LetterFile } from "./types/Types";
import DocumentSidebar from "./modules/DocumentSidebar";
import TopBar from "./modules/TopBar";
import ReactQuill from "react-quill";

const App = () => {
  const quill = useRef<ReactQuill>(null);

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
          { insert: " raining!" },
          { attributes: { header: 1 }, insert: "\n" },
          { insert: " Woo!" },
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

  const [formats, setFormats] = useState<Format>({});

  const onChange = (newValue: LetterDocument["value"]) => {
    const documentsCopy = [...letterFile.documents];
    documentsCopy[currentDocument].value = newValue;
    setLetterFile((lf) => ({ ...lf, documents: documentsCopy }));
  };

  /* if (!letterFile.documents[currentDocument]) {
    if (letterFile.documents.length < 1)
      setLetterFile({
        ...letterFile,
        documents: [
          {
            title: "",
            value: [],
          },
        ],
      });

    setCurrentDocument(0);
    return <></>;
  } */

  return (
    <div className="App absolute top-0 left-0 h-full w-full flex flex-col">
      <TopBar formats={formats} quill={quill} setLetterFile={setLetterFile} />
      <div className="w-full h-full flex justify-center">
        <DocumentSidebar
          documents={letterFile.documents}
          setDocuments={(nd: LetterFile["documents"]) => {
            console.log("Updating documents");
            setLetterFile((lf) => ({ ...lf, documents: nd }));
          }}
          currentDocument={currentDocument}
          setCurrentDocument={setCurrentDocument}
        />
        <TextEditor
          value={letterFile.documents[currentDocument].value}
          onChange={onChange}
          formats={formats}
          setFormats={setFormats}
          quill={quill}
        />
      </div>
    </div>
  );
};

export default App;
