import {
  ComponentType,
  memo,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import styles from "./draggable.module.css";

type DraggableProps = {
  id: string;
  insertAfter: (
    draggableId: string,
    Placeholder: ({ style, id }: any) => JSX.Element
  ) => void;
  variant?: string;
  children: ReactNode;
  index?: number;
};

const Dot = memo(() => <div className={styles.dot}></div>);

const getPlaceholderMarkup = (
  WrappedComponent: ComponentType<any>,
  id: string
) => {
  return () => {
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

    const drop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const data = e.dataTransfer.getData(id);
      console.log(data);
    };

    return <WrappedComponent onDragOver={dragOver} onDrop={drop} />;
  };
};

const Dots = memo(({ variant }: any) => {
  return variant === "left-dots" ? (
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
  ) : null;
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

  const dragStart = useCallback((e: any) => {
    if (dragRef.current) {
      const itemId = dragRef.current.id;
      currentDraggable.current = itemId;
      e.dataTransfer.setData(itemId, itemId);
      console.log(e.dataTransfer);
    }
  }, []);

  const dragEnd = (e: any) => {
    // const itemId = dragRef.current.id;
    // reset draggeditemid as required
  };

  const dragOver = useCallback((e: any, id: string) => {
    const target = e.target;
    if (
      target.id === id &&
      currentDraggable.current !== target.id &&
      prevDragOver.current !== target.id
    ) {
      if (target.dataset.testid?.includes("draggable_div_")) {
        const { width, height } = target.getBoundingClientRect();

        const CustomPlaceholder = ({ onDragOver, onDrop }: any) => (
          <div
            id={target.id}
            onDragOver={onDragOver}
            onDrop={onDrop}
            data-testid={`placeholder_div_${id}`}
            style={{ width, height, border: "3px dashed #000" }}
          />
        );
        const Placeholder = getPlaceholderMarkup(
          CustomPlaceholder,
          currentDraggable.current
        );
        insertAfter(target.id as string, Placeholder);
      }
    }
    prevDragOver.current = target.id;
  }, []);

  const dragLeave = useCallback(() => {
    prevDragOver.current = "";
  }, []);

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
