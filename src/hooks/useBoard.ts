import { useCallback, useMemo, useState } from "react";
import { BOARD_DATA } from "../config/board";
import { TypeBoardData } from "../types/board";

export const useBoard = () => {
  let removedItem = "";

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

  const addNewBoardItem = useCallback((callback: () => void) => {
    const key = removedItem ? removedItem : "item" + (Object.keys(board)?.length + 1);
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

    if(callback){
      callback();
    }
  }, [board]);

  const removeThisBoardItem = useCallback(
    (id: string, callback: (id: string) => void) => {
      removedItem = id;
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

  const saveToStorage = () => {
    localStorage.setItem("user.offline.board", JSON.stringify(board));
  };

  const updateThisItem = (
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

  const updateBoard = (itemsOrder: string[]) => {
    const sortedBoard = itemsOrder.reduce((acc, item) => {
      acc[item] = board[item];
      return acc;
    }, {} as TypeBoardData);
    setBoard(sortedBoard);
  };

  return {
    board,
    addNewBoardItem,
    removeThisBoardItem,
    updateThisItem,
    updateBoard,
    saveToStorage,
  };
};
