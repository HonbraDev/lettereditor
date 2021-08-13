import { FC, RefObject } from "react";
import { Format } from "../types/Types";
import { Pivot, DefaultButton, Dropdown, IconButton } from "@fluentui/react";
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
import PivotItem from "./PivotItem";
import FormatButton from "./FormatButton";
import ReactQuill from "react-quill";

const TopBar: FC<{
  formats: Format;
  quill: RefObject<ReactQuill>;
}> = ({ formats, quill }) => {
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
        <PivotItem headerText="File">file</PivotItem>
        <PivotItem headerText="Format" className="gap-4">
          <div className="flex flex-row">
            <Dropdown
              selectedKey={formats.header ? formats.header.toString() : "0"}
              className="w-32"
              options={[
                {
                  key: "0",
                  text: "Normal",
                },
                {
                  key: "1",
                  text: "Header 1",
                },
                {
                  key: "2",
                  text: "Header 2",
                },
              ]}
              onChange={console.log}
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
              style={{
                color: formats.color ? formats.color : "gray",
              }}
            >
              <TextColor24Regular />
            </IconButton>
            <IconButton
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
        <PivotItem headerText="Tools">
          <DefaultButton>Search</DefaultButton>
        </PivotItem>
      </Pivot>
    </div>
  );
};

export default TopBar;
