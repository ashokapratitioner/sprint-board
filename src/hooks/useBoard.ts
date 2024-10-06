import { useCallback, useState } from "react";
import { BOARD_DATA } from "../config/board";

export const useBoard = () => {
  const [board, setBoard] = useState<typeof BOARD_DATA>(BOARD_DATA);

  const addNewBoardItem = useCallback(() => {
    const key = "item" + (Object.keys(board)?.length + 1);
    const newItem = {
      id: key,
      title: "",
      value: "",
      delete: true,
    };

    setBoard((prevBoard) => ({
      ...prevBoard,
      [key]: newItem,
    }));
  }, [board]);

  const removeThisBoardItem = useCallback(
    (id: string, callback: (id: string) => void) => {
      setBoard((prevBoard) => {
        const updatedBoard = { ...prevBoard };
        if(callback) { callback(id)}
        delete updatedBoard[id];
        return updatedBoard;
      });
    },
    [board]
  );

  return { board, addNewBoardItem, removeThisBoardItem }
};
