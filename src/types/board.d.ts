export type BoardItemType = {
  id: string;
  title: string;
  value: string;
  delete: boolean;
}
export type BoardStateType = Record<string, BoardItemType>;


type TypeBoardData = {
  board: BoardStateType;
  setBoard: React.Dispatch<React.SetStateAction<BoardStateType>>;
};

