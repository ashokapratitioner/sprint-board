import { useForm, SubmitHandler } from "react-hook-form";
import { useBoard } from "../../hooks/useBoard";
import { memo } from "react";
import DragDropContainer, { initPlaholderState } from "../Draggable/DragDropContainer";
import { BoardItemType } from "../../types/board";


const applyAddColumnRule = (options: any) => {
  const { itemKeys, itemIndex, max = 6, min = 3 } = options;
  const itemLength = itemKeys?.length;
  return itemLength >= min && itemIndex === itemLength - 1 && itemIndex + 1 < max;
};

const applyReduceColumnRule = (options: any) => {
  const { min = 3, index } = options;
  return index >= min;
};

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const buttonClass =
  "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200";

const BoardComponent = memo(() => {
  const {
    register,
    unregister,
    handleSubmit,
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-3 align-top"
    >
      <DragDropContainer<BoardItemType>
        updatedItems={updateBoard}
        items={board}
        render={(item, itemKeys, itemKey, itemIndex, setPlaceHolder) => {
          return (
            <div className="mb-5 w-full" key={itemKey}>
              <input
                className={inputClass}
                defaultValue={item[itemKey].title}
                id={itemKey}
                {...register(itemKey, { required: true })}
                onChange={(e) => updateThisItem(e, itemKey)}
              />
              {errors[itemKey] && <span>This field is required</span>}
              {applyAddColumnRule({ itemKeys, itemKey, itemIndex }) && (
                <button
                  type="button"
                  aria-label="Add a new board item"
                  onClick={() =>
                    addNewBoardItem((id) => {
                      setPlaceHolder(initPlaholderState);
                      register(id);
                    })
                  }
                >
                  Add
                </button>
              )}
              {applyReduceColumnRule({ index: itemIndex }) && (
                <button
                  type="button"
                  aria-label="Remove a board item"
                  onClick={() =>
                    removeThisBoardItem(itemKey, (id) => {
                      unregister(id);
                    })
                  }
                >
                  Remove
                </button>
              )}
            </div>
          );
        }}
      >
        <button className={buttonClass}>Submit</button>
      </DragDropContainer>
    </form>
  );
});

export default BoardComponent;
