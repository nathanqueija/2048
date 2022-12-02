import { Row } from "./types";
import * as R from "ramda";

const peek = (row: Row) => R.last(row);

export const mergeRight = (r: Row) => {
  // Filtering only row values that are not 0
  const row = r.filter((x) => x);

  const result = [];

  while (row.length) {
    // Take last value of the row
    let value = row.pop() || 0;

    // If the value that was popped is equal to the last value
    // The values are added
    if (value === peek(row)) value += row.pop()!;

    //The sum is added to the beginning of the result array
    result.unshift(value);
  }

  while (result.length < r.length) result.unshift(0);
  return result as Row;
};

export const mergeLeft = (r: Row) => {
  return mergeRight([...r].reverse()).reverse();
};

// export const mergeUp = board => zip(zip(board).map(mergeRowLeft));
// export const mergeDown = board => zip(zip(board).map(mergeRowRight));
