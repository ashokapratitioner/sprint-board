import { memo } from "react";
import styles from "./draggable.module.css";

export default memo(function Dot() {
  return <div className={styles.dot}></div>;
});
