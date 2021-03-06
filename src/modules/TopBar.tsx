import { Dispatch, FC, RefObject, useCallback } from "react";
import { Format, LetterFile } from "../types/Types";
import {
  Pivot,
  DefaultButton,
  Dropdown,
  IconButton,
  PivotItem,
  TextField,
  Link,
} from "@fluentui/react";
import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  TextStrikethrough24Regular,
  TextColor24Regular,
  ColorBackground24Regular,
  TextSubscript24Regular,
  TextSuperscript24Regular,
  TextQuote24Regular,
  Code24Regular,
  TextNumberListLtr24Regular,
  TextBulletListLtr24Regular,
  TextIndentDecrease24Regular,
  TextIndentIncrease24Regular,
  TextAlignLeft24Regular,
  TextAlignRight24Regular,
  TextAlignCenter24Regular,
  TextAlignDistributed24Regular,
  ClearFormatting24Regular,
} from "@fluentui/react-icons";
import FormatButton from "./FormatButton";
import type ReactQuill from "react-quill";
import { useDropzone } from "react-dropzone";
import { useBoolean, useId } from "@fluentui/react-hooks";
import ColorCallout from "./ColorCallout";

const TopBar: FC<{
  formats: Format;
  quill: RefObject<ReactQuill>;
  letterFile: LetterFile;
  setLetterFile: Dispatch<LetterFile>;
}> = ({ formats, quill, letterFile, setLetterFile }) => {
  const textColorId = useId("textcolor");
  const backgroundColorId = useId("textcolor");

  const [textColorExpanded, { toggle: toggleTextColor }] = useBoolean(false);
  const [backgroundColorExpanded, { toggle: toggleBackgroundColor }] =
    useBoolean(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return;

      try {
        const reader = new FileReader();

        reader.onerror = () => {
          throw new Error("Cannot read file");
        };
        reader.onload = () => {
          try {
            const parsed = JSON.parse(reader.result as string);
            setLetterFile(parsed);
          } catch (e) {
            alert("Invalid or corrupted file");
          }
        };
        reader.readAsText(acceptedFiles[0]);
      } catch (e) {
        console.error(e);
      }
    },
    [setLetterFile]
  );

  const { open, getRootProps, getInputProps } = useDropzone({ onDrop });

  const save = () => {
    const content = JSON.stringify(letterFile);
    const blob = new Blob([content], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${letterFile.title}.ltr`;
    link.click();
    link.remove();
  };

  const clearFormats = () => {
    const selection = quill.current?.getEditor().getSelection();
    quill.current
      ?.getEditor()
      .removeFormat(selection?.index!, selection?.length!, "user");
  };

  const setFormat = <T extends keyof Format>(type: T, value: Format[T]) =>
    quill.current?.getEditor().format(type, value, "user");

  const toggleFormat = (type: keyof Format) => setFormat(type, !formats[type]);

  return (
    <div className="transition-shadow px-4 bg-white border-b border-gray-200">
      <Pivot aria-label="Letter navbar">
        <PivotItem
          headerText="File"
          className="h-12 flex items-center gap-2 px-4 justify-center"
          itemKey="file"
        >
          <TextField
            value={letterFile.title}
            onChange={(e) => {
              setLetterFile({
                ...letterFile,
                title: (e.target as HTMLInputElement).value,
              });
            }}
          />
          <DefaultButton
            iconProps={{
              iconName: "circleplus",
            }}
            onClick={() => {
              if (
                window.confirm(
                  "Unsaved changes will be lost. Do you want to continue?"
                )
              )
                setLetterFile({
                  title: "A document",
                  documents: [
                    {
                      title: "New document",
                      value: [],
                    },
                  ],
                });
            }}
          >
            New
          </DefaultButton>

          <span {...getRootProps()}>
            <input {...getInputProps()} />
            <DefaultButton
              onClick={open}
              iconProps={{
                iconName: "folderopen",
              }}
            >
              Open
            </DefaultButton>
          </span>

          <DefaultButton
            onClick={save}
            iconProps={{
              iconName: "save",
            }}
          >
            Save
          </DefaultButton>
        </PivotItem>
        <PivotItem
          headerText="Format"
          className="gap-4 h-12 flex items-center px-4 justify-center"
          itemKey="format"
        >
          <div className="flex flex-row">
            <Dropdown
              selectedKey={formats.header ? formats.header.toString() : "0"}
              className="w-32"
              options={[
                {
                  key: "1",
                  text: "Header 1",
                },
                {
                  key: "2",
                  text: "Header 2",
                },
                {
                  key: "0",
                  text: "Normal",
                },
              ]}
              onChange={(_, item) => {
                setFormat("header", parseInt(item!.key as string));
              }}
            />
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={TextBold24Regular}
              active={formats.bold}
              onClick={() => toggleFormat("bold")}
            />
            <FormatButton
              icon={TextItalic24Regular}
              active={formats.italic}
              onClick={() => toggleFormat("italic")}
            />
            <FormatButton
              icon={TextUnderline24Regular}
              active={formats.underline}
              onClick={() => toggleFormat("underline")}
            />
            <FormatButton
              icon={TextStrikethrough24Regular}
              active={formats.strike}
              onClick={() => toggleFormat("strike")}
            />
          </div>
          <div className="flex flex-row">
            <IconButton
              id={textColorId}
              onClick={toggleTextColor}
              style={{
                color: formats.color ? formats.color : "gray",
              }}
            >
              <TextColor24Regular />
            </IconButton>
            <IconButton
              id={backgroundColorId}
              onClick={toggleBackgroundColor}
              style={{
                color: formats.background ? formats.background : "gray",
              }}
            >
              <ColorBackground24Regular />
            </IconButton>
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={TextSubscript24Regular}
              active={formats.script === "sub"}
            />
            <FormatButton
              icon={TextSuperscript24Regular}
              active={formats.script === "super"}
            />
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={TextQuote24Regular}
              active={formats.blockquote}
              onClick={() => toggleFormat("blockquote")}
            />
            <FormatButton
              icon={Code24Regular}
              active={formats.code}
              onClick={() => toggleFormat("code")}
            />
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={TextNumberListLtr24Regular}
              active={formats.list === "ordered"}
            />
            <FormatButton
              icon={TextBulletListLtr24Regular}
              active={formats.list === "bullet"}
            />
            <FormatButton icon={TextIndentDecrease24Regular} active={false} />
            <FormatButton icon={TextIndentIncrease24Regular} active={false} />
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={(() => {
                switch (formats.align) {
                  case "right":
                    return TextAlignRight24Regular;
                  case "center":
                    return TextAlignCenter24Regular;
                  case "justify":
                    return TextAlignDistributed24Regular;
                  default:
                    return TextAlignLeft24Regular;
                }
              })()}
              active={false}
            />
          </div>
          <div className="flex flex-row">
            <FormatButton
              icon={ClearFormatting24Regular}
              active={false}
              onClick={clearFormats}
            />
          </div>
        </PivotItem>
        <PivotItem
          headerText="About"
          className="h-12 flex items-center gap-1 px-4 justify-center"
          itemKey="about"
        >
          <Link href="https://github.com/honbradev/lettereditor">
            LetterEditor
          </Link>{" "}
          by <Link href="https://github.com/honbradev">HonbraDev</Link>
        </PivotItem>
      </Pivot>
      <ColorCallout
        active={textColorExpanded}
        toggle={toggleTextColor}
        onColorChange={(color) => setFormat("color", color)}
        selectedColor={formats.color}
        anchorId={textColorId}
      />
      <ColorCallout
        active={backgroundColorExpanded}
        toggle={toggleBackgroundColor}
        onColorChange={(color) => setFormat("background", color)}
        selectedColor={formats.background}
        anchorId={backgroundColorId}
        background={true}
      />
    </div>
  );
};

export default TopBar;
