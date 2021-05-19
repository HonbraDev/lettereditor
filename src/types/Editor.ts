export interface Format {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  color?: string;
  background?: string;
  script?: "sub" | "super";
  header?: number;
  blockquote?: boolean;
  code?: boolean;
  list?: "ordered" | "bullet";
  indent?: number;
  align?: "left" | "center" | "right" | "justify";
}
