import { FC } from "react";
import { IconButton, IButtonProps } from "@fluentui/react";
import { IFluentIconsProps } from "@fluentui/react-icons";

const FormatButton: FC<
  {
    icon: React.FC<React.HTMLAttributes<HTMLSpanElement> & IFluentIconsProps>;
    active?: boolean;
  } & IButtonProps
> = ({ icon: Icon, active, ...props }) => (
  <IconButton
    style={{
      backgroundColor: active
        ? "RGBA(128, 128, 128, 0.1)"
        : "RGBA(128, 128, 128, 0)",
      color: "gray",
    }}
    className="transition-colors"
    {...props}
  >
    <Icon />
  </IconButton>
);

export default FormatButton;
