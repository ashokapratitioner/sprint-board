import { useParams } from "react-router-dom";
import styles from "./tasks.style.module.css";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { tasks } from "../../data/tasks";

export default function TaskExpandView() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const oneTask = tasks?.find((t) => t.id === parseInt(id, 10));
      setTask(oneTask || null);
    }
  }, [id]);

  if (!task) return <>No record found</>;

  return (
    <div className={styles.taskViewContainer}>
      <TextField value={task.title}></TextField>
      <br />
      <br />
      <TextField value={task.description}></TextField>
    </div>
  );
}
