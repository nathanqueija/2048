import {
  create,
  place,
  size,
  isEmpty,
  clone,
  placeAtRandom,
  hasEmptySlot,
  fillSlot,
  maxValue,
  slideRight,
  slideLeft,
  slideUp,
  slideDown,
} from "./core";
import * as RandomUtils from "../../utils/random";
import * as R from "ramda";

describe("Creation", () => {
  test("creates board with default 6x6 size", () => {
    const board = create();
    const boardSize = size(board);
    expect(boardSize).toStrictEqual([6, 6]);
  });

  test("initializes the board with zeros", () => {
    const board = create();
    for (const row of board) {
      for (const column of row) {
        expect(column).toEqual(0);
      }
    }
  });
});

describe("Dimensions", () => {
  test("calculates the dimensions of a square matrix", () => {
    let boardSize = size([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    expect(boardSize).toStrictEqual([3, 3]);

    boardSize = size([
      [0, 0],
      [0, 0],
      [0, 0],
    ]);
    expect(boardSize).toStrictEqual([3, 2]);

    boardSize = size([[0], [0], [0]]);
    expect(boardSize).toStrictEqual([3, 1]);
  });

  test("thrown an error if  number of columns is not consistent", () => {
    expect(() =>
      size([
        [0, 0],
        [0, 0, 0],
        [0, 0, 0, 0],
      ])
    ).toThrow();
  });
});

describe("Slot values", () => {
  test("returns true if slot is empty", () => {
    const board = create(2);
    expect(isEmpty(board, 0, 0)).toBe(true);
    expect(isEmpty(board, 0, 1)).toBe(true);
    expect(isEmpty(board, 1, 0)).toBe(true);
    expect(isEmpty(board, 1, 1)).toBe(true);
  });

  test("returns false if slot is not empty", () => {
    const board = create(2);
    const boardWithPlacedNumber = place(board, 0, 0, 2);
    expect(isEmpty(boardWithPlacedNumber, 0, 0)).toBe(false);
    expect(isEmpty(boardWithPlacedNumber, 0, 1)).toBe(true);
    expect(isEmpty(boardWithPlacedNumber, 1, 0)).toBe(true);
    expect(isEmpty(boardWithPlacedNumber, 1, 1)).toBe(true);
  });

  test("checks if board has empty slot", () => {
    const board = create(2);
    expect(hasEmptySlot(board)).toBe(true);
    expect(
      hasEmptySlot([
        [1, 0],
        [1, 1],
      ])
    ).toBe(true);
    expect(
      hasEmptySlot([
        [1, 1],
        [1, 1],
      ])
    ).toBe(false);
  });

  test("finds the max value", () => {
    expect(
      maxValue([
        [0, 0],
        [2, 4],
      ])
    ).toBe(4);

    expect(
      maxValue([
        [0, 4],
        [2, 4],
      ])
    ).toBe(4);

    expect(
      maxValue([
        [2048, 0],
        [2, 4],
      ])
    ).toBe(2048);
  });
});

describe("Immutability", () => {
  test("clones don't mutate the original board", () => {
    const board = create();
    const newBoard = clone(board);
    newBoard[0][0] = 6;
    expect(board[0][0]).toStrictEqual(0);
    expect(newBoard[0][0]).toStrictEqual(6);
  });
});

describe("Placement", () => {
  test("places a given number into a given spot", () => {
    const board = create(3);
    const boardWithPlacedNumber = place(board, 0, 0, 2);
    expect(boardWithPlacedNumber[0][0]).toStrictEqual(2);
  });

  test("places a given number into a random spot", () => {
    const board = create(3);
    const randomSlotSpy = jest.spyOn(RandomUtils, "randomWithinRange");
    randomSlotSpy.mockReturnValue(1);
    const boardWithPlacedNumber = placeAtRandom(board, 2);
    expect(randomSlotSpy).toHaveBeenCalled();
    expect(boardWithPlacedNumber).toStrictEqual([
      [0, 0, 0],
      [0, 2, 0],
      [0, 0, 0],
    ]);
    randomSlotSpy.mockRestore();
  });
});

describe("Slot filler", () => {
  test("fills all empty slots until the board is full", () => {
    let board = create(2);

    const processBoard = R.pipe(R.flatten, R.sum);

    expect(processBoard(board)).toStrictEqual(0);

    board = fillSlot(board);
    expect(processBoard(board)).toStrictEqual(1);

    board = fillSlot(board);
    expect(processBoard(board)).toStrictEqual(2);

    board = fillSlot(board);
    expect(processBoard(board)).toStrictEqual(3);

    board = fillSlot(board);
    expect(processBoard(board)).toStrictEqual(4);

    expect(() => fillSlot(board)).toThrow();
  });
});

describe("Moves", () => {
  it("merges to the right", () => {
    expect(
      slideRight([
        [2, 2],
        [2, 4],
      ])
    ).toStrictEqual([
      [0, 4],
      [2, 4],
    ]);
  });

  it("merges to the left", () => {
    expect(
      slideLeft([
        [2, 2],
        [2, 2],
      ])
    ).toStrictEqual([
      [4, 0],
      [4, 0],
    ]);
  });

  it("merges up", () => {
    expect(
      slideUp([
        [2, 2],
        [2, 2],
      ])
    ).toStrictEqual([
      [4, 4],
      [0, 0],
    ]);
  });

  it("merges down", () => {
    expect(
      slideDown([
        [2, 2],
        [2, 2],
      ])
    ).toStrictEqual([
      [0, 0],
      [4, 4],
    ]);
  });
});
