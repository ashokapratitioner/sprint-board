import { ReactNode } from "react";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

type DraggableProps = {
  id: string;
  insertPlaceholder?: TypeInsertPlaceholder;
  dragOver?: TypeDragOver;
  dragStart?: TypeDragStart;
  dragLeave?: () => void;
  dragEnd?: TypeDragEnd;
  variant?: string;
  children: ReactNode;
  index?: number;
};

type TypeInsertPlaceholder = (
  draggableId: string,
  Placeholder: ({ style, id }: any) => JSX.Element
) => void;

type TypeDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  itemId: string
) => void;

type TypeDragEnd = (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;

type TypeDragOver = (
  e: React.DragEvent<HTMLDivElement>,
  itemId: string
) => void;

type StyleProperties = {
  width: string;
  height: string;
  border: string;
};
