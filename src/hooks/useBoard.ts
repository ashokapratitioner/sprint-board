import { useCallback, useContext } from "react";
import { BoardStateType, TypeBoardData } from "../types/board";
import { BoardContext } from "../context/BoardContext";

export const useBoard = () => {
  const { board, setBoard } = useContext<TypeBoardData>(BoardContext);
  let removedItem = "";

  const addNewBoardItem = useCallback(
    (callback: () => void) => {
      const key = removedItem
        ? removedItem
        : "item" + (Object.keys(board)?.length + 1);
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

      if (callback) {
        callback();
      }
    },
    [board]
  );

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
    }, {} as BoardStateType);
    setBoard(sortedBoard);
  };

  const getKeys = (data: BoardStateType) => {
    return Object.keys(data);
  };

  const getBoardAsArray = (data: BoardStateType) => {
    const result = [];
    for (const key in data) {
      result.push(data[key]);
    }

    return result;
  };

  return {
    board,
    getKeys,
    getBoardAsArray,
    addNewBoardItem,
    removeThisBoardItem,
    updateThisItem,
    updateBoard,
    saveToStorage,
  };
};
