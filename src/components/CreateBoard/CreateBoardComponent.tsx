import { useForm, SubmitHandler } from "react-hook-form";
import { useBoard } from "../../hooks/useBoard";

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

const CreateBoardComponent = () => {
  const {
    register,
    unregister,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { board, addNewBoardItem, removeThisBoardItem }= useBoard()

  const onSubmit: SubmitHandler<any> = (data: any) => console.log(data);

  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col p-5 align-top"
    >
      {Object.keys(board).map((boardKey: string, i: number) => (
        <div key={boardKey} className="mb-5">
          <input
            className={inputClass}
            defaultValue={board[boardKey].title}
            id={board[boardKey].id}
            {...register(board[boardKey].id, { required: true })}
          />
          {errors[board[boardKey].value] && <span>This field is required</span>}
          {applyAddColumnRule({ boardKeys: Object.keys(board), boardKey, index: i }) && (
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
              onClick={() => removeThisBoardItem(board[boardKey].id, (id) => { unregister(id); })}
            >
              remove
            </button>
          )}
        </div>
      ))}

      <button className={buttonClass}>Submit</button>
    </form>
  );
};

export default CreateBoardComponent;
