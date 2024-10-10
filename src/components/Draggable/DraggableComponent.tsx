import { ReactNode, useCallback, useState } from "react";
import styles from "./draggable.module.css";

type DraggableProps = {
  id: string;
  updateDraggable: (draggableId: number) => void;
  variant?: string;
  children: ReactNode;
};

const Dot = () => <div className={styles.dot}></div>;

export default function DraggableComponentomponent({
  id,
  variant = "none",
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

  const variantMarkup = useCallback(() => {
    console.log(variant);
    return (
      variant === "left-dots" && (
        <div className={styles.dotsContainer}>
          <div className={styles.dots}>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
          </div>
          <div className={styles.dots}>
            <Dot />
            <Dot />
            <Dot />
            <Dot />
          </div>
        </div>
      )
    );
  }, [variant]);

  return (
    <div
      draggable="true"
      data-testid={"draggable_div_" + id}
      onDragStart={(e) => onDragStart(e, id)}
      onDrop={(e) => onDrop(e)}
      className={styles.draggableContainer}
    >
      {variantMarkup()}
      {children}
    </div>
  );
}
