import styles from "./Board.module.css";

interface BoardProps {
  rows: number;
  columns: number;
}

export const Board = ({
  children,
  rows,
  columns,
}: React.PropsWithChildren<BoardProps>) => {
  return (
    <div
      className={styles.board}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {children}
    </div>
  );
};
