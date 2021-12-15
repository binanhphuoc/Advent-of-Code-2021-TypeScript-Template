import lodash from "lodash";

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

const solve = (input: { dot: Array<number[]>; fold: Array<[string, number]> }) => {
  for (const line of input.fold) {
    input.dot = lodash.uniqWith(
      input.dot.filter((dot) => !isDotOnLine(dot, line)).map((dot) => foldDotByLine(dot, line)),
      lodash.isEqual
    );
    break;
  }
  return input.dot.length;
};

export default solve;
