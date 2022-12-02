import styles from "./Tile.module.css";

const COLORS = {
  0: "f4f1de",
  1: "d9ed92",
  2: "001219",
  4: "005f73",
  8: "0a9396",
  16: "94d2bd",
  32: "e9d8a6",
  64: "ee9b00",
  128: "ca6702",
  256: "bb3e03",
  512: "ae2012",
  1024: "9b2226",
  2048: "f72585",
};

interface TileProps {
  children: number;
}

export const Tile = ({ children }: TileProps) => {
  return (
    <div
      className={styles.tile}
      style={{ background: `#${COLORS[children as keyof typeof COLORS]}` }}
    >
      {children !== 0 && children}
    </div>
  );
};
