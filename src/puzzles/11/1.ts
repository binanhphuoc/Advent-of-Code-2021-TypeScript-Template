import lodash from "lodash";
import { entries, map } from "../../utils";

const findAdjLocations = (input: number[][], [r, c]: number[]): number[][] => {
  return [
    [r - 1, c],
    [r + 1, c],
    [r, c - 1],
    [r, c + 1],
    [r - 1, c - 1],
    [r + 1, c - 1],
    [r + 1, c + 1],
    [r - 1, c + 1]
  ].filter(([r, c]) => r >= 0 && r < input.length && c >= 0 && c < input[r].length);
};

export default (octs: number[][]) => {
  let flashes = 0;
  for (const {} of lodash.range(100)) {
    const queue: number[][] = [];
    for (const [[r, c]] of entries(octs)) {
      octs[r][c] += 1;
      if (octs[r][c] === 10) {
        flashes++;
        queue.push([r, c]);
      }
    }
    while (queue.length > 0) {
      const [r, c] = queue.shift() as number[];
      const adjLocations = findAdjLocations(octs, [r, c]);
      for (const [r, c] of adjLocations) {
        octs[r][c] += 1;
        if (octs[r][c] === 10) {
          flashes++;
          queue.push([r, c]);
        }
      }
    }

    octs = map<number>(octs, (val) => (val >= 10 ? 0 : val));
  }
  return flashes;
};
