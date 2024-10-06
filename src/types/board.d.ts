// type  { board: Array<BoardItem>, index: number, max: number, min: number }

export type TypeBoardData = {
  [key: string]: {
    id: string;
    title: string;
    value: string;
    delete: boolean;
  };
};
