import { useRef } from "react";
import styles from "./draggable.module.css";
import Dots from "./Dots";
import { DraggableProps } from "./model";

export default function DraggableComponent({
  id,
  variant = "none",
  dragStart,
  dragOver,
  dragLeave,
  dragEnd,
  index,
  children,
}: DraggableProps) {
  const dragRef = useRef<HTMLDivElement>(null);

  const dragStartWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragRef.current && dragStart) {
      const itemId = dragRef.current.id;
      dragStart(e, itemId);
    }
  };

  const dragOverWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragRef.current && dragOver) {
      const itemId = dragRef.current.id;
      e.dataTransfer.dropEffect = "move";
      dragOver(e, itemId);
    }
  };

  const dragEndWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    if (dragRef.current && dragEnd) {
      const itemId = dragRef.current.id;
      dragEnd(e, itemId);
    }
  };

  return (
    <div
      draggable="true"
      ref={dragRef}
      data-testid={"draggable_div_" + id}
      onDragStart={dragStartWrapper}
      onDragEnd={dragEndWrapper}
      data-index={index}
      onDragOver={dragOverWrapper}
      id={id}
      className={styles.draggableContainer}
      onDragLeave={dragLeave}
    >
      <Dots variant={variant} />
      {children}
    </div>
  );
}
