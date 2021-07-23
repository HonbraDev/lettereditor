import { FC } from "react";
import { IconButton, IButtonProps } from "@fluentui/react";
import { IFluentIconsProps } from "@fluentui/react-icons";

const FormatButton: FC<
  {
    icon: React.FC<React.HTMLAttributes<HTMLSpanElement> & IFluentIconsProps>;
    active?: boolean;
  } & IButtonProps
> = ({ icon: Icon, active, ...props }) => (
  <IconButton style={{ color: active ? undefined : "gray" }} {...props}>
    <Icon />
  </IconButton>
);

export default FormatButton;
