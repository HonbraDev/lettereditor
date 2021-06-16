import { Dispatch, FC, SetStateAction, useState } from "react";
import { LetterDocument } from "../types/Types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const DocumentSidebar: FC<{
  documents: LetterDocument;
  setDocuments: Dispatch<SetStateAction<LetterDocument>>;
  currentDocument: number;
  setCurrentDocument: Dispatch<SetStateAction<number>>;
}> = ({ documents, setDocuments, currentDocument, setCurrentDocument }) => {
  const [newDocument, setNewDocument] = useState("");

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
            className="border-r border-gray-200 overflow-auto"
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
                    className={`px-3 py-2 cursor-pointer overflow-ellipsis overflow-hidden whitespace-nowrap w-56 text-sm h-auto ${
                      index === currentDocument
                        ? "bg-gray-100 hover:bg-gray-200"
                        : "bg-white hover:bg-gray-100"
                    }`}
                    onClick={() => setCurrentDocument(index)}
                  >
                    {doc.title}
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
