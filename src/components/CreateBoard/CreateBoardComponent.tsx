import { useForm, SubmitHandler } from "react-hook-form";
import { useBoard } from "../../hooks/useBoard";
import { lazy, memo, useMemo } from "react";
const DraggableComponentomponent = lazy(
  () => import("../Draggable/DraggableComponent")
);

const applyAddColumnRule = (options: any) => {
  const { boardKeys, index, max = 6, min = 3 } = options;
  const boardLength = boardKeys?.length;
  return boardLength >= min && index === boardLength - 1 && index + 1 < max;
};

const applyReduceColumnRule = (options: any) => {
  const { board, boardKey } = options;
  return board?.[boardKey]?.delete;
};

const inputClass =
  "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

const buttonClass =
  "w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200";

const CreateBoardComponent = memo(() => {
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
    updateBoardItem,
    update,
  } = useBoard();

  const onSubmit: SubmitHandler<{ [key: string]: string }> = () => {
    update();
  };

  const boardKeys = useMemo(() => Object.keys(board), [board]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-3 align-top"
    >
      {boardKeys.map((boardKey: string, i: number) => (
        <DraggableComponentomponent
          variant="left-dots"
          key={boardKey}
          id={boardKey}
          updateDraggable={() => {}}
        >
          <div className="mb-5 w-full">
            <input
              className={inputClass}
              defaultValue={board[boardKey].title}
              id={board[boardKey].id}
              {...register(board[boardKey].id, { required: true })}
              onChange={(e) => updateBoardItem(e, board[boardKey].id)}
            />
            {errors[board[boardKey].value] && (
              <span>This field is required</span>
            )}
            {applyAddColumnRule({
              boardKeys: boardKeys,
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
            {applyReduceColumnRule({ board, boardKey }) && (
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
        </DraggableComponentomponent>
      ))}

      <button className={buttonClass}>Submit</button>
    </form>
  );
});

export default CreateBoardComponent;
