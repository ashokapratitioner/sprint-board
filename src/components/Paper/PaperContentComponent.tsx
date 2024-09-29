import { Paper } from "@mui/material";

const PaperContentComponent = ({ children }: any) => {
  return <Paper elevation={3}>{children}</Paper>;
};

export default PaperContentComponent;
