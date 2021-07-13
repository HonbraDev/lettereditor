import { Dispatch, FC, SetStateAction, useState } from "react";
import { LetterDocument } from "../types/Types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { X } from "react-feather";

const DocumentSidebar: FC<{
  documents: LetterDocument[];
  setDocuments: Dispatch<SetStateAction<LetterDocument[]>>;
  currentDocument: number;
  setCurrentDocument: Dispatch<SetStateAction<number>>;
}> = ({ documents, setDocuments, currentDocument, setCurrentDocument }) => {
  const [newDocument, setNewDocument] = useState("");

  const deleteDocument = (index = currentDocument) => {
    const documentsCopy = [...documents];
    documentsCopy.splice(index, 1);
    setDocuments(documentsCopy);
  };

  const renameDocument = (newName: string, index = currentDocument) => {
    const documentsCopy = [...documents];
    documentsCopy[index] = {
      ...documentsCopy[index],
      title: newName,
    };
    setDocuments(documentsCopy);
  };

  return (
    <DragDropContext
      onDragEnd={(result) => {
        if (!result.destination) return;
        const documentsCopy = [...documents];
        const movedDocument = documentsCopy.splice(result.source.index, 1)[0];
        documentsCopy.splice(result.destination.index, 0, movedDocument);
        setDocuments(documentsCopy);
        if (result.source.index === currentDocument)
          return setCurrentDocument(result.destination.index);
        if (
          result.source.index < currentDocument &&
          result.destination.index >= currentDocument
        )
          return setCurrentDocument((d) => d - 1);
        if (
          result.source.index > currentDocument &&
          result.destination.index <= currentDocument
        )
          return setCurrentDocument((d) => d + 1);
      }}
    >
      <Droppable droppableId="documents">
        {(provided) => (
          <ul
            className="border-r border-gray-200 overflow-auto w-64 p-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {documents.map((doc, index) => (
              <Draggable
                draggableId={doc + index.toString()}
                index={index}
                key={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap text-sm h-auto w-full flex justify-between group px-3 py-2 rounded-md mb-2 ${
                      index === currentDocument
                        ? "bg-blue-500 text-white hover:bg-blue-400 font-bold"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      if (currentDocument === index) return;
                      setCurrentDocument(index);
                    }}
                    onDoubleClick={() => {
                      if (currentDocument !== index) return;
                      const newName = prompt(
                        "Rename document",
                        documents[currentDocument].title
                      );
                      if (!newName) return;
                      renameDocument(newName);
                    }}
                  >
                    {/* {currentDocument === index ? (
                      <input
                        className="bg-transparent px-3 py-2"
                        type="text"
                        value={doc.title}
                        onChange={(e) => {
                          const documentsCopy = [...documents];
                          documentsCopy[index] = {
                            ...documentsCopy[index],
                            title: e.target.value,
                          };
                          setDocuments(documentsCopy);
                        }}
                      />
                    ) : ( */}
                    <div>{doc.title}</div>
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        if (documents.length === 1) return;
                        deleteDocument();
                        setCurrentDocument(currentDocument - 1);
                      }}
                    >
                      <X size="16" className="text-gray-400" />
                    </button>
                    {/* )} */}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const documentsCopy = [...documents];
                documentsCopy.push({
                  title: newDocument,
                  value: [],
                });
                setDocuments(documentsCopy);
                setNewDocument("");
                setCurrentDocument(documentsCopy.length - 1);
              }}
            >
              <input
                className="px-3 py-2 text-sm w-full h-auto"
                placeholder="New document"
                type="text"
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
              />
            </form>
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DocumentSidebar;
