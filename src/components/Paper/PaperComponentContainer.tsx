import TaskQuickView from "../Tasks/TaskQuickView";
import PaperContentComponent from "./PaperContentComponent";
import PaperPlaceholderComponent from "./PaperPlaceholderComponent";
import styles from "./paper.style.module.css";

const defaultColumn = [{ name: "Default", value: "default", order: null }];

export default function PaperContainerComponent({
  columns = defaultColumn,
  data,
}: any) {
  return (
    <div className={styles.paperContainer} data-testid="paper-container">
      {columns.map(({ name, value }: any) => (
        <PaperPlaceholderComponent
          key={"paper-placeholder_" + value}
          title={name}
          value={value}
        >
          {data?.map(
            (task: any) =>
              task.status === value && (
                <PaperContentComponent key={task.id}>
                  <TaskQuickView {...task} />
                </PaperContentComponent>
              )
          )}
        </PaperPlaceholderComponent>
      ))}
    </div>
  );
}
