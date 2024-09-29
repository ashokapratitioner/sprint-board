import { ReactNode, useState } from "react";

type DraggableProps = {
  id: string;
  key: string | number;
  updateDraggableId: (draggableId: number) => void;
  children: ReactNode;
};

export default function DraggableComponent({
  key,
  id,
  updateDraggableId,
  children,
}: DraggableProps) {
  const [draggedItemId, setDraggedItemId] = useState(null);

  const onDragStart = (e: any, itemId: any) => {
    setDraggedItemId(itemId);
    e.dataTransfer.setData("text/plain", itemId);
  };

  const onDrop = (e: any) => {
    if (draggedItemId) {
      updateDraggableId(draggedItemId);
      setDraggedItemId(null);
    }
    e.preventDefault();
  };

  return (
    <div
      draggable="true"
      data-testid={"draggable_div_" + key}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={(e) => onDrop(e)}
    >
      {children}
    </div>
  );
}
