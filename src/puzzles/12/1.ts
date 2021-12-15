import { upperCase } from "lodash";

const START = "start";
const END = "end";

const countPaths = (caveMap: Record<string, Array<string>>): number => {
  console.log(caveMap);
  const visitedSmallCaves: Record<string, number> = {};
  const path = [START];
  return countPathsFrom(START, caveMap, visitedSmallCaves, 0, path);
};

const countPathsFrom = (
  cave: string,
  caveMap: Record<string, Array<string>>,
  visitedSmallCaves: Record<string, number>,
  pathCount: number,
  path: string[]
): number => {
  for (const nextCave of caveMap[cave]) {
    if (visitedSmallCaves[nextCave] === 1) {
      continue;
    }
    if (nextCave === END) {
      pathCount++;
      continue;
    }
    if (nextCave === START) {
      continue;
    }
    if (upperCase(nextCave) !== nextCave) {
      visitedSmallCaves[nextCave] = 1;
    }
    path.push(nextCave);
    pathCount = countPathsFrom(nextCave, caveMap, visitedSmallCaves, pathCount, path);
    path.pop();
    if (upperCase(nextCave) !== nextCave) {
      visitedSmallCaves[nextCave] = 0;
    }
  }
  // console.log(path, pathCount);
  return pathCount;
};

export default countPaths;
