import { ReactNode } from "react";


type PlaceholderProps = {
    id: string;
    placeholder: ({ style, id }: any) => JSX.Element;
    direction: string;
  };
  
  interface DragDropContainerProps<T> {
    children?: React.ReactNode;
    updateItems: (elementIds: string[]) => void;
    items: Record<string, T>;
    render: (
      items: Record<string, T>,
      itemsKeys: string[],
      itemKey: string,
      itemIndex: number,
      setPlaceHolder: (placeholder: PlaceholderProps) => void
    ) => JSX.Element;
  }

type DroppableProps = {
  id: string;
  children: ReactNode;
  onDrop?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
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

type TypeDragEnd = (e: React.DragEvent<HTMLDivElement>, elementIds: string[]) => void;

type TypeDragOver = (
  e: React.DragEvent<HTMLDivElement>,
  itemId: string
) => void;

type StyleProperties = {
  width: string;
  height: string;
  border: string;
};
