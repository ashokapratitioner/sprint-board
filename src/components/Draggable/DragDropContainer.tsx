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

const DraggableComponent = lazy(
  () => import("../Draggable/DraggableComponent")
);
const DroppableComponent = lazy(
  () => import("../Draggable/DroppableComponent")
);

type PlaceholderProps = {
  id: string;
  placeholder: ({ style, id }: any) => JSX.Element;
  direction: string;
};

interface DragDropContainerProps<T> {
  children?: React.ReactNode;
  updatedItems: (elementIds: string[]) => void;
  items: Record<string, T>;
  render: (
    items: Record<string, T>,
    itemsKeys: string[],
    itemKey: string,
    itemIndex: number,
    setPlaceHolder: (placeholder: PlaceholderProps) => void
  ) => JSX.Element;
}

export const initPlaholderState = {
  id: "",
  placeholder: () => <></>,
  direction: "top",
};

const DragDropContainer = <T,>({
  children,
  updatedItems,
  items,
  render,
}: DragDropContainerProps<T>) => {
  const [placeHolder, setPlaceHolder] =
    useState<PlaceholderProps>(initPlaholderState);
  const currentDraggable = useRef<string>("");
  const prevDragOver = useRef<string>("");

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
    setPlaceHolder(initPlaholderState);
  }, [setPlaceHolder]);

  const dragEnd = useCallback(
    (e: React.DragEvent<HTMLDivElement>, elementIds: string[]) => {
      if (JSON.stringify(elementIds) === JSON.stringify(itemsKeys)) {
        resetPlaceholder();
      } else {
        updatedItems(elementIds);
      }
    },
    [itemsKeys, resetPlaceholder, updatedItems]
  );

  const dragOver = useCallback(
    (e: any, itemId: string) => {
      const target = e.target;
      if (currentDraggable.current !== target.id) {
        if (target.dataset.testid?.includes("draggable_div_")) {
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
          insertPlaceholder(target.id as string, Placeholder);
        }
      }
    },
    [insertPlaceholder, getPlaceholderMarkup]
  );

  const dragLeave = useCallback(() => {
    prevDragOver.current = "";
  }, []);

  return (
    <Suspense fallback="loading...">
      <DroppableComponent id="boardContainer">
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
                dragLeave={dragLeave}
                key={itemKey}
                id={itemKey}
                index={itemIndex}
                insertPlaceholder={insertPlaceholder}
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
