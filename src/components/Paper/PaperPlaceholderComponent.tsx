import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";
import styles from "./paper.style.module.css";

type PaperProps = {
  children: ReactNode;
  title: string;
  value: string;
};

export default function PaperPlaceholderComponent({
  children,
  title,
  value,
}: PaperProps) {
  return (
    <Paper
      data-testid={value}
      id={value}
      className={`${styles.paperContainerItem} ${styles[value]}`}
    >
      {title && (
        <Typography variant="h6" className={styles.heading}>
          {title}
        </Typography>
      )}
      {children}
    </Paper>
  );
}
