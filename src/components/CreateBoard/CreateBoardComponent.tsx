import { useForm, SubmitHandler } from "react-hook-form";
import { useBoard } from "../../hooks/useBoard";
import React, {
  forwardRef,
  lazy,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { getPlaceholderMarkup } from "../Draggable/getPlaceholderMarkup";

const DraggableComponent = lazy(
  () => import("../Draggable/DraggableComponent")
);
const DroppableComponent = lazy(
  () => import("../Draggable/DroppableComponent")
);

// const DragDropContainer = lazy(
//   () => import("../Draggable/DragDropContainer")
// );

type PlaceholderProps = {
  id: string;
  placeholder: ({ style, id }: any) => JSX.Element;
};

const applyAddColumnRule = (options: any) => {
  const { boardKeys, index, max = 6, min = 3 } = options;
  const boardLength = boardKeys?.length;
  return boardLength >= min && index === boardLength - 1 && index + 1 < max;
};

const applyReduceColumnRule = (options: any) => {
  const { min = 3, index } = options;
  return index >= min;
};

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const buttonClass =
  "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200";

const CreateBoardComponent = memo(() => {
  const [placeHolder, setPlaceHolder] = useState<PlaceholderProps>({
    id: "",
    placeholder: () => <></>,
  });
  const currentDraggable = useRef<string>("");
  const prevDragOver = useRef<string>("");

  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {
    board,
    addNewBoardItem,
    removeThisBoardItem,
    updateThisItem,
    updateBoard,
    saveToStorage,
  } = useBoard();

  const onSubmit: SubmitHandler<{ [key: string]: string }> = () => {
    saveToStorage();
  };

  const boardKeys = useMemo(() => Object.keys(board), [board]);

  const dragStart = useCallback((e: any, itemId: string) => {
    currentDraggable.current = itemId;
    e.dataTransfer.setData("text/plain", e.target.id);
  }, []);

  const dragEnd = (e: React.DragEvent<HTMLDivElement>, itemId: string) => {
    const element = document.getElementById(itemId);
    if (element) {
      const parentNode = element.parentNode as HTMLDivElement;
      const elementIds = Array.from(parentNode.children)
        .filter(
          (child) =>
            child.tagName === "DIV" &&
            child.matches('[data-testid^="draggable_div_"]')
        )
        .map((div) => div.id);
      updateBoard(elementIds);
    }
  };

  const dragOver = useCallback((e: any, itemId: string) => {
    const target = e.target;
    if (
      target.id === itemId &&
      currentDraggable.current !== target.id &&
      prevDragOver.current !== target.id
    ) {
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
    prevDragOver.current = target.id;
  }, []);

  const dragLeave = useCallback(() => {
    prevDragOver.current = "";
  }, []);

  const insertPlaceholder = (
    targetId: string,
    Placeholder: ({ style, id }: any) => JSX.Element
  ) => {
    setPlaceHolder({
      id: targetId,
      placeholder: Placeholder,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-3 align-top"
    >
      <DroppableComponent id="boardContainer">
        {boardKeys.map((boardKey: string, i: number) => (
          <React.Fragment key={boardKey}>
            {boardKey === placeHolder.id ? <placeHolder.placeholder /> : <></>}
            <DraggableComponent
              variant="left-dots"
              dragStart={dragStart}
              dragOver={dragOver}
              dragEnd={dragEnd}
              dragLeave={dragLeave}
              key={boardKey}
              id={boardKey}
              index={i}
              insertPlaceholder={insertPlaceholder}
            >
              <div className="mb-5 w-full">
                <input
                  className={inputClass}
                  defaultValue={board[boardKey].title}
                  id={board[boardKey].id}
                  {...register(board[boardKey].id, { required: true })}
                  onChange={(e) => updateThisItem(e, board[boardKey].id)}
                />
                {errors[board[boardKey].value] && (
                  <span>This field is required</span>
                )}
                {applyAddColumnRule({
                  boardKeys,
                  boardKey,
                  index: i,
                }) && (
                  <button
                    type="button"
                    aria-label="Add a new board item"
                    onClick={addNewBoardItem}
                  >
                    add
                  </button>
                )}
                {applyReduceColumnRule({ index: i }) && (
                  <button
                    type="button"
                    aria-label="Remove a board item"
                    onClick={() =>
                      removeThisBoardItem(board[boardKey].id, (id) => {
                        unregister(id);
                      })
                    }
                  >
                    remove
                  </button>
                )}
              </div>
            </DraggableComponent>
          </React.Fragment>
        ))}

        <button className={buttonClass}>Submit</button>
      </DroppableComponent>
    </form>
  );
});

export default CreateBoardComponent;
