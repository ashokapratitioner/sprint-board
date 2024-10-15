import { ComponentType, memo, ReactNode, useCallback, useRef, useState } from "react";
import styles from "./draggable.module.css";
import ReactDOM from 'react-dom/client';

type DraggableProps = {
  id: string;
  insertAfter: (draggableId: string, Placeholder: () => JSX.Element) => void;
  variant?: string;
  children: ReactNode;
  index?: number;
};

const Dot = memo(() => <div className={styles.dot}></div>);

// const getPlaceholderMarkup = (WrappedComponent: ComponentType<any>) => {
//   return ({computedStyles}: any) => {
//     return <WrappedComponent {...computedStyles} />;
//   }  
// }; 

const Dots = memo(({variant}: any) => {
  return (
    variant === "left-dots" ? (
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
    ) : null
  );
});

export default function DraggableComponent({
  id,
  variant = "none",
  insertAfter,
  index,
  children,
}: DraggableProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const currentDraggable = useRef<string>("");
  const prevDragOver = useRef<string>("");

  const dragStart = (e: any) => {
    if (dragRef.current) {
      const itemId = dragRef.current.id;
      currentDraggable.current = itemId;
      e.dataTransfer.setData(itemId, itemId);
    }
  };

  const dragEnd = (e: any) => {
    // const itemId = dragRef.current.id;
    // reset draggeditemid as required
  };

  const dragOver = (e: any, id: string) => {
    const target = e.target;
    if (target.id === id && (currentDraggable.current !== target.id) && prevDragOver.current !== target.id) {
      // console.log(prevDragOver.current, target.id);
      // create a draggable effect and space for visual representation
      if (target.dataset.testid?.includes("draggable_div_")) {
        const { width, height } = target.getBoundingClientRect();
       
        const CustomPlaceholder = () => (
          <div style={{ width, height, border: '3px dashed #000' }} />
        );
        // const Placeholder = getPlaceholderMarkup(CustomPlaceholder);
        insertAfter((target.id as string), CustomPlaceholder);
        // dragRef.current?.insertBefore(placeholderDiv, target);
      }
      
    }
    prevDragOver.current = target.id;
  };

  const dragLeave = () => {
    prevDragOver.current = "";
  }

  return (
    <div
      draggable="true"
      ref={dragRef}
      data-testid={"draggable_div_" + id}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      data-index={index}
      onDragOver={(e) => dragOver(e, id)}
      id={id}
      className={styles.draggableContainer}
      onDragLeave={dragLeave}
    >
      <Dots variant={variant} />
      {children}
    </div>
  );
}
