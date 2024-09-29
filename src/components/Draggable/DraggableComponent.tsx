import { ReactNode, useState } from "react";

type DraggableProps = {
  id: string;
  updateDraggable: (draggableId: number) => void;
  children: ReactNode;
};

export default function DraggableComponent({
  id,
  updateDraggable,
  children,
}: DraggableProps) {
  const [draggedItemId, setDraggedItemId] = useState(null);

  const onDragStart = (e: any, itemId: any) => {
    setDraggedItemId(itemId);
    e.dataTransfer.setData("text/plain", itemId);
  };

  const onDrop = (e: any) => {
    if (draggedItemId) {
      updateDraggable && updateDraggable(draggedItemId);
      setDraggedItemId(null);
    }
    e.preventDefault();
  };

  return (
    <div
      draggable="true"
      data-testid={"draggable_div_" + id}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={(e) => onDrop(e)}
    >
      {children}
    </div>
  );
}
