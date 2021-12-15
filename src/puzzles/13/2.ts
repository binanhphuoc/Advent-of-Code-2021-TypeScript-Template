import lodash from "lodash";
import { map } from "../../utils";

function isDotOnLine(dot: number[], line: [string, number]) {
  return line[0] === "x" ? dot[0] === line[1] : dot[1] === line[1];
}

function foldDotByLine(dot: number[], line: [string, number]) {
  const dotInFoldArea = line[0] === "x" ? dot[0] > line[1] : dot[1] > line[1];
  if (!dotInFoldArea) {
    return dot;
  }
  return line[0] === "x" ? [line[1] * 2 - dot[0], dot[1]] : [dot[0], line[1] * 2 - dot[1]];
}

function printCode(dot: number[][]): string {
  const [maxX, maxY] = dot.reduce(([maxX, maxY], [x, y]) => [Math.max(maxX, x), Math.max(maxY, y)], [0, 0]);
  let sheet = [...lodash.range(maxY + 1).map(() => lodash.range(maxX + 1).map(() => " "))];

  const dotMap = {} as Record<string, string>;
  dot.forEach((d) => {
    dotMap[JSON.stringify(d)] = "_";
  });

  sheet = map(sheet, (val, r, c) => {
    return JSON.stringify([c, r]) in dotMap ? "#" : val;
  }) as string[][];

  let str = "";
  sheet.forEach((line) => {
    line.forEach((c) => {
      str += c;
    });
    str += "\n";
  });

  return str;
}

const solve = (input: { dot: Array<number[]>; fold: Array<[string, number]> }) => {
  for (const line of input.fold) {
    input.dot = lodash.uniqWith(
      input.dot.filter((dot) => !isDotOnLine(dot, line)).map((dot) => foldDotByLine(dot, line)),
      lodash.isEqual
    );
  }

  return printCode(input.dot);
};

export default solve;
