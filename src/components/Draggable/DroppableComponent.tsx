import { ReactNode } from "react";
import styles from "./dragdrop.style.module.css";

type DroppableProps = {
  id: string;
  children: ReactNode;
};

export default function DroppableComponent({ id, children }: DroppableProps) {
  const onDragOver = (e: any) => {
    e.preventDefault();
  };

  return (
    <div
      className={styles.paperContainer}
      id={id}
      onDragOver={onDragOver}
      data-testid={"droppable_div_" + id}
    >
      {children}
    </div>
  );
}
