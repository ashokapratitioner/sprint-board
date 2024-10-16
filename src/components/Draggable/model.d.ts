type DraggableProps = {
  id: string;
  insertAfter?: InsertAfter;
  dragOver?: DragOver;
  dragStart?: DragStart;
  dragLeave?: () => void;
  dragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
  variant?: string;
  children: ReactNode;
  index?: number;
};

type InsertAfter = (
  draggableId: string,
  Placeholder: ({ style, id }: any) => JSX.Element
) => void;

type DragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;

type DragOver = (e: React.DragEvent<HTMLDivElement>, itemId: string) => void;

