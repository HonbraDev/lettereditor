import { FC } from "react";
import { PivotItem as BasePivotItem, IPivotItemProps } from "@fluentui/react";

const PivotItem: FC<IPivotItemProps> = ({
  className,
  headerButtonProps,
  ...props
}) => (
  <BasePivotItem
    className={`${className} h-12 flex items-center gap-1 px-4`}
    {...props}
  />
);

export default PivotItem;
