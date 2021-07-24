import { Dispatch, FC, SetStateAction } from "react";
import { Format } from "../types/Types";
import { Pivot, DefaultButton, Dropdown, IconButton } from "@fluentui/react";
import {
  TextBold24Regular,
  TextItalic24Regular,
  TextUnderline24Regular,
  TextStrikethrough24Regular,
  TextColor24Regular,
} from "@fluentui/react-icons";
import PivotItem from "./PivotItem";
import FormatButton from "./FormatButton";

const TopBar: FC<{
  formats: Format;
  setFormats: Dispatch<SetStateAction<Format>>;
}> = ({ formats }) => (
  <div className="transition-shadow px-4 bg-white border-b border-gray-200">
    <Pivot aria-label="Letter navbar">
      <PivotItem headerText="File">file</PivotItem>
      <PivotItem headerText="Format">
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
        />
        <FormatButton icon={TextBold24Regular} active={formats.bold} />
        <FormatButton icon={TextItalic24Regular} active={formats.italic} />
        <FormatButton
          icon={TextUnderline24Regular}
          active={formats.underline}
        />
        <FormatButton
          icon={TextStrikethrough24Regular}
          active={formats.strike}
        />
        <IconButton
          style={{
            color: formats.color ? formats.color : "gray",
          }}
        >
          <TextColor24Regular />
        </IconButton>
      </PivotItem>
      <PivotItem headerText="Tools">
        <DefaultButton>Search</DefaultButton>
      </PivotItem>
    </Pivot>
  </div>
);

export default TopBar;
