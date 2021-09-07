import { Callout, SwatchColorPicker } from "@fluentui/react";
import { FC } from "react";

const colors = [
  "#e60000",
  "#ff9900",
  "#ffff00",
  "#008a00",
  "#0066cc",
  "#9933ff",
  "#ffffff",
  "#facccc",
  "#ffebcc",
  "#ffffcc",
  "#cce8cc",
  "#cce0f5",
  "#ebd6ff",
  "#bbbbbb",
  "#f06666",
  "#ffc266",
  "#ffff66",
  "#66b966",
  "#66a3e0",
  "#c285ff",
  "#888888",
  "#a10000",
  "#b26b00",
  "#b2b200",
  "#006100",
  "#0047b2",
  "#6b24b2",
  "#444444",
  "#5c0000",
  "#663d00",
  "#666600",
  "#003700",
  "#002966",
  "#3d1466",
];

const ColorCallout: FC<{
  active: boolean;
  toggle: () => any;
  onColorChange: (color: string | undefined) => any;
  selectedColor: string | undefined;
  anchorId: string;
  background?: boolean;
}> = ({
  active,
  toggle,
  onColorChange,
  selectedColor,
  anchorId,
  background,
}) => {
  return active ? (
    <Callout
      gapSpace={10}
      isBeakVisible={false}
      onDismiss={toggle}
      target={`#${anchorId}`}
      directionalHint={5}
      className="px-3 py-2 bg-white"
    >
      <SwatchColorPicker
        selectedId={selectedColor}
        onChange={(_, id) => {
          toggle();
          onColorChange(id);
          console.log(id);
        }}
        columnCount={7}
        cellShape={"circle"}
        cellHeight={20}
        cellWidth={20}
        colorCells={[
          /* @ts-expect-error */
          { id: undefined, color: background ? "#ffffff" : "#000000" },
          ...colors.map((color) => ({
            id: color,
            color: color,
          })),
        ]}
      />
    </Callout>
  ) : null;
};
export default ColorCallout;
