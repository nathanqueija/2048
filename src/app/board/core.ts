import { randomWithinRange } from "../../utils/random";
import * as AppRow from "../row";
import * as R from "ramda";
import { Board } from "./types";

export const DEFAULT_BOARD_SIZE = 6;

export const create = (size: number = DEFAULT_BOARD_SIZE): Board =>
  [...Array(size)].map(() => Array(size).fill(0));

export const size = (board: Board) => {
  const rows = board.length;
  let columns = board[0].length;

  for (const row of board) {
    if (row.length !== columns)
      throw new Error("The number of columns is not consistent.");
    columns = row.length;
  }
  return [rows, columns];
};

export const isEmpty = (board: Board, row: number, column: number) =>
  board[row][column] === 0;

export const randomSlot = (board: Board): [number, number] => {
  const [rows, columns] = size(board);

  const [minRow, maxRow] = [0, rows - 1];
  const [minCol, maxCol] = [0, columns - 1];

  return [randomWithinRange(minRow, maxRow), randomWithinRange(minCol, maxCol)];
};

export const clone = (board: Board): Board => JSON.parse(JSON.stringify(board));

export const hasEmptySlot = (board: Board) =>
  R.flatten(board).some((v) => v === 0);

export const place = (
  board: Board,
  row: number,
  column: number,
  value: number
): Board => {
  const clonedBoard = clone(board);
  clonedBoard[row] = R.update(column, value, clonedBoard[row]);
  return clonedBoard;
};

export const placeAtRandom = (board: Board, value: number): Board => {
  const [row, column] = randomSlot(board);

  const clonedBoard = clone(board);

  return place(clonedBoard, row, column, value);
};

export function fillSlot(board: Board, value: number = 1) {
  if (!hasEmptySlot(board)) throw new Error("Board is full!");

  let foundEmptySlot = false;

  let newBoard: Board = clone(board);

  while (!foundEmptySlot) {
    const [row, column] = randomSlot(newBoard);

    if (isEmpty(board, row, column)) {
      newBoard = place(board, row, column, value);
      foundEmptySlot = true;
    }
  }

  return newBoard;
}

export const slideRight = (board: Board): Board => {
  return board.map((row) => AppRow.mergeRight(row));
};

export const slideLeft = (board: Board): Board => {
  return board.map((row) => AppRow.mergeLeft(row));
};

export const slideUp = (board: Board): Board => {
  const transposedBoard = R.transpose(board);
  const mergedLeft = transposedBoard.map((row) => AppRow.mergeLeft(row));
  return R.transpose(mergedLeft);
};

export const slideDown = (board: Board): Board => {
  const transposedBoard = R.transpose(board);
  const mergedRight = transposedBoard.map((row) => AppRow.mergeRight(row));
  return R.transpose(mergedRight);
};

export const maxValue = (board: Board) => Math.max(...R.flatten(board));
