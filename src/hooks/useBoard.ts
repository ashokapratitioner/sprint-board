import { useCallback, useMemo, useState } from "react";
import { BOARD_DATA } from "../config/board";
import { TypeBoardData } from "../types/board";

export const useBoard = () => {
  const init = useCallback(() => {
    let boardData: TypeBoardData;
    const storage = localStorage.getItem("user.offline.board");
    if (storage) {
      boardData = JSON.parse(storage || "{}");
    } else {
      boardData = BOARD_DATA;
    }
    return boardData;
  }, []);

  const [board, setBoard] = useState<typeof BOARD_DATA>(init());

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
        if (callback) {
          callback(id);
        }
        delete updatedBoard[id];
        return updatedBoard;
      });
    },
    [board]
  );

  const update = () => {
    localStorage.setItem("user.offline.board", JSON.stringify(board));
  };

  const updateBoardItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;
    const updatedItem = {
      ...board[id],
      title: value,
      value: value?.toLowerCase()?.replace(/ /g, "-"),
    };
    setBoard((prevBoard) => ({
      ...prevBoard,
      [id]: updatedItem,
    }));
  };

  return {
    board,
    addNewBoardItem,
    removeThisBoardItem,
    updateBoardItem,
    update,
  };
};
