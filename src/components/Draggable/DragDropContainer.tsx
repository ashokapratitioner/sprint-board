import React, {
  forwardRef,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { getPlaceholderMarkup } from "./getPlaceholderMarkup";
import { DragDropContainerProps, PlaceholderProps } from "./model";

const DraggableComponent = lazy(
  () => import("../Draggable/DraggableComponent")
);
const DroppableComponent = lazy(
  () => import("../Draggable/DroppableComponent")
);

export const initPlaceholderState = {
  id: "",
  placeholder: () => <></>,
  direction: "top",
};

const DragDropContainer = <T,>({
  children,
  updateItems,
  items,
  render,
}: DragDropContainerProps<T>) => {
  const [placeHolder, setPlaceHolder] =
    useState<PlaceholderProps>(initPlaceholderState);
  const currentDraggable = useRef<string>("");
  const prevDraggable = useRef<string>("");

  const itemsKeys = useMemo(() => Object.keys(items), [items]);

  const getDirection = useCallback(
    (placeholderId: string, draggableId: string) => {
      const placeholderIndex = itemsKeys?.findIndex(
        (key) => key === placeholderId
      );
      const draggableIndex = itemsKeys?.findIndex((key) => key === draggableId);
      return draggableIndex > placeholderIndex ? "top" : "bottom";
    },
    [itemsKeys]
  );

  const insertPlaceholder = useCallback(
    (targetId: string, Placeholder: ({ style, id }: any) => JSX.Element) => {
      setPlaceHolder({
        id: targetId,
        placeholder: Placeholder,
        direction: getDirection(targetId, currentDraggable.current),
      });
    },
    [setPlaceHolder, getDirection]
  );

  const dragStart = useCallback((e: any, itemId: string) => {
    currentDraggable.current = itemId;
  }, []);

  const resetPlaceholder = useCallback(() => {
    if (placeHolder?.id) {
      setTimeout(() => setPlaceHolder(initPlaceholderState), 1000);
    }
  }, [placeHolder?.id, placeHolder?.direction]);

  const dragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>, elementIds: string[]) => {
      if (JSON.stringify(elementIds) !== JSON.stringify(itemsKeys)) {
        updateItems(elementIds);
      }
    },
    [itemsKeys, updateItems]
  );

  const dragOver = useCallback(
    (e: any, itemId: string) => {
      e.preventDefault();
      const target = e.target;
      if (
        currentDraggable.current !== target.id &&
        prevDraggable.current !== target.id &&
        target.dataset.testid?.includes("draggable_div_")
      ) {
        const { width, height } = target.getBoundingClientRect();
        const CustomPlaceholder = forwardRef(
          ({ onDragOver, onDrop }: any, ref: any) => (
            <div
              id={target.id}
              onDragOver={onDragOver}
              onDrop={onDrop}
              ref={ref}
              data-testid={`placeholder_div_${itemId}`}
              style={{ width, height, border: "3px dashed #000" }}
            />
          )
        );
        const Placeholder = getPlaceholderMarkup(
          CustomPlaceholder,
          currentDraggable.current
        );
        prevDraggable.current = target.id;
        insertPlaceholder(target.id as string, Placeholder);
      }
    },
    [insertPlaceholder, getPlaceholderMarkup]
  );

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    currentDraggable.current = "";
    prevDraggable.current = "";
  };

  const dragEndDroppable = () => {
    resetPlaceholder();
    // console.log("dragEndDroppable", placeHolder);
  };

  return (
    <Suspense fallback="loading...">
      <DroppableComponent
        id="boardContainer"
        onDrop={onDrop}
        onDragEnd={dragEndDroppable}
      >
        {itemsKeys.map((itemKey: string, itemIndex: number) => (
          <React.Fragment key={itemKey}>
            {itemKey === placeHolder.id && placeHolder.direction === "top" ? (
              <placeHolder.placeholder />
            ) : (
              <></>
            )}
            <Suspense fallback="loading...">
              <DraggableComponent
                variant="left-dots"
                dragStart={dragStart}
                dragOver={dragOver}
                dragEnd={dragEnd}
                key={itemKey}
                id={itemKey}
                index={itemIndex}
              >
                {render(items, itemsKeys, itemKey, itemIndex, setPlaceHolder)}
              </DraggableComponent>
            </Suspense>
            {itemKey === placeHolder.id &&
            placeHolder.direction === "bottom" ? (
              <placeHolder.placeholder />
            ) : (
              <></>
            )}
          </React.Fragment>
        ))}
        {children}
      </DroppableComponent>
    </Suspense>
  );
};

export default DragDropContainer;
