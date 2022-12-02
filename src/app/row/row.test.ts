import { mergeLeft, mergeRight } from "./core";

describe("Slide", () => {
  test("merges to the right", () => {
    expect(mergeRight([2, 0, 4, 2, 0, 0])).toStrictEqual([0, 0, 0, 2, 4, 2]);
    expect(mergeRight([2, 0, 4, 2, 2, 2])).toStrictEqual([0, 0, 2, 4, 2, 4]);
    expect(mergeRight([0, 0, 0, 0, 2, 2])).toStrictEqual([0, 0, 0, 0, 0, 4]);
    expect(mergeRight([0, 0, 0, 0, 0, 0])).toStrictEqual([0, 0, 0, 0, 0, 0]);
    expect(mergeRight([2, 4, 6, 8, 10, 12])).toStrictEqual([
      2, 4, 6, 8, 10, 12,
    ]);
  });

  test("merges to the left", () => {
    expect(mergeLeft([2, 0, 4, 2, 0, 0])).toStrictEqual([2, 4, 2, 0, 0, 0]);
    expect(mergeLeft([2, 0, 4, 2, 2, 2])).toStrictEqual([2, 4, 4, 2, 0, 0]);
    expect(mergeLeft([0, 0, 0, 0, 2, 2])).toStrictEqual([4, 0, 0, 0, 0, 0]);
    expect(mergeLeft([0, 0, 0, 0, 0, 0])).toStrictEqual([0, 0, 0, 0, 0, 0]);
    expect(mergeLeft([2, 4, 6, 8, 10, 12])).toStrictEqual([2, 4, 6, 8, 10, 12]);
  });
});
