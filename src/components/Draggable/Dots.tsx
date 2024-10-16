import { memo } from "react";
import Dot from "./Dot";
import styles from "./draggable.module.css";

export default memo(function Dots({ variant }: any) {
  return variant === "left-dots" ? (
    <div className={styles.dotsContainer}>
      <div className={styles.dots}>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </div>
      <div className={styles.dots}>
        <Dot />
        <Dot />
        <Dot />
        <Dot />
      </div>
    </div>
  ) : null;
});
