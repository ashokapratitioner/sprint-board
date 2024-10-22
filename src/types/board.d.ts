export type BoardStateType = {
  [key: string]: {
    id: string;
    title: string;
    value: string;
    delete: boolean;
  };
};

type TypeBoardData = {
  board: BoardStateType;
  setBoard: React.Dispatch<React.SetStateAction<BoardStateType>>;
};

