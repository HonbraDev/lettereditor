import { useRef, useState } from "react";
import "./App.scss";
import TextEditor from "./modules/TextEditor";
import { Format, LetterDocument, LetterFile } from "./types/Types";
import DocumentSidebar from "./modules/DocumentSidebar";
import TopBar from "./modules/TopBar";
import ReactQuill from "react-quill";
import useLocalStorage from "react-use-localstorage";

const App = () => {
  const quill = useRef<ReactQuill>(null);

  const [currentDocument, setCurrentDocument] = useState(0);
  const [letterFileStringified, setLetterFileStringified] = useLocalStorage(
    "letterFile",
    JSON.stringify({
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
    })
  );

  /*
   * This is not the best way to do it, but I'm not paid to figure out the best way.
   * Now that I think about it, I'm not being paid at all. This is a school project.
   */
  const letterFile = JSON.parse(letterFileStringified) as LetterFile;
  const setLetterFile = (lf: LetterFile) =>
    setLetterFileStringified(JSON.stringify(lf));

  const [formats, setFormats] = useState<Format>({});

  const onChange = (newValue: LetterDocument["value"]) => {
    const documentsCopy = [...letterFile.documents];
    documentsCopy[currentDocument].value = newValue;
    setLetterFile({ ...letterFile, documents: documentsCopy });
  };

  return (
    <div className="App absolute top-0 left-0 h-full w-full flex flex-col">
      <TopBar
        formats={formats}
        quill={quill}
        letterFile={letterFile}
        setLetterFile={setLetterFile}
      />
      <div className="w-full flex justify-center flex-1 overflow-auto">
        <DocumentSidebar
          documents={letterFile.documents}
          setDocuments={(nd: LetterFile["documents"]) => {
            console.log("Updating documents");
            setLetterFile({ ...letterFile, documents: nd });
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
