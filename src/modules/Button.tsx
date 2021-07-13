import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from "react";

const sizeClassnames = {
  big: "py-2 px-6 text-sm rounded-lg",
  small: "px-2 py-1 text-sm rounded-md",
};

const colorClassnames = {
  primary:
    "text-white bg-blue-500 hover:bg-blue-400 disabled:text-gray-300 disabled:bg-blue-400",
  secondary:
    "text-inherit bg-gray-200 hover:bg-gray-300 disabled:text-gray-700",
};

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  size?: keyof typeof sizeClassnames;
  color?: keyof typeof colorClassnames;
  icon?: ReactNode;
  transition?: boolean;
};

const Button: FC<ButtonProps> = ({
  children,
  size = "big",
  color = "primary",
  disabled,
  icon,
  className = "",
  transition,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={`flex outline-none focus:ring-4 focus:ring-${color} ${
        sizeClassnames[size]
      } ${transition ? `transition duration-200 ease-in-out` : ``} ${
        colorClassnames[color]
      } font-bold flex items-center justify-center ${className}`}
      data-testid="button"
      {...props}
    >
      <span className="flex items-center">
        {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
        {children}
      </span>
    </button>
  );
};

export default Button;
