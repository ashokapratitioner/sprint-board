import { createContext, ReactNode, useState } from "react";
import { BoardStateType, TypeBoardData } from "../types/board";
import { BOARD_DATA } from "../config/board";

const init = () => {
  let boardData: BoardStateType;
  const storage = localStorage.getItem("user.offline.board");
  if (storage) {
    boardData = JSON.parse(storage || "{}");
  } else {
    boardData = BOARD_DATA;
  }
  return boardData;
};


export const BoardContext = createContext({} as TypeBoardData);

const BoardContextProvider = ({ children }: { children: ReactNode }) => {
  const [board, setBoard] = useState(init());

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
