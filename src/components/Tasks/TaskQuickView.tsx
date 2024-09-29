import { useNavigate } from "react-router-dom";
import styles from "./tasks.style.module.css";
import { Button, Typography } from "@mui/material";

const TaskQuickView = ({ id, title, description }: any) => {
  const navigate = useNavigate();
  const handleDialogView = () => {
    navigate(`/tasks/${id}`);
  };

  return (
    <div className={styles.taskViewContainer}>
      <Typography variant="subtitle1" className={styles.subheading}>
        {title}
      </Typography>
      <Typography variant="body1">{description}</Typography>
      <Button color="primary" variant="outlined" onClick={handleDialogView}>
        Open
      </Button>
    </div>
  );
};

export default TaskQuickView;
