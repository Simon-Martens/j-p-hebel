export interface RichTextRun {
  text: string;
  bold?: boolean;
  italic?: boolean;
  href?: string;
  targetBlank?: boolean;
  ariaLabel?: string;
}

export interface HeadingBlock {
  type: "heading";
  level: 2 | 3;
  text: string;
  className?: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  runs: RichTextRun[];
  className?: string;
}

export interface LinesBlock {
  type: "lines";
  lines: RichTextRun[][];
  className?: string;
}

export interface ListBlock {
  type: "list";
  items: RichTextRun[][];
  className?: string;
}

export type RichTextBlock = HeadingBlock | ParagraphBlock | LinesBlock | ListBlock;
