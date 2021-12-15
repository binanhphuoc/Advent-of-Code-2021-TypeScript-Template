import { upperCase } from "lodash";

const START = "start";
const END = "end";

const countPaths = (caveMap: Record<string, Array<string>>): number => {
  console.log(caveMap);
  const visitedSmallCaves: Record<string, number> = {};
  const path = [START];
  return countPathsFrom(START, caveMap, visitedSmallCaves, 0, path);
};

const isSmallCave = (cave: string): boolean => {
  return upperCase(cave) !== cave && cave !== START && cave !== END;
};

const hasVisitedMoreThanOneSmallCaveTwice = (visitedSmallCaves: Record<string, number>): boolean => {
  const valuesGreaterThanOne = Object.values(visitedSmallCaves).filter((value) => value > 1);
  return valuesGreaterThanOne.length > 1 || valuesGreaterThanOne[0] === 3;
};

const countPathsFrom = (
  cave: string,
  caveMap: Record<string, Array<string>>,
  visitedSmallCaves: Record<string, number>,
  pathCount: number,
  path: string[]
): number => {
  for (const nextCave of caveMap[cave]) {
    if (nextCave === END) {
      pathCount++;
      continue;
    }
    if (nextCave === START) {
      continue;
    }
    if (isSmallCave(nextCave)) {
      if (!visitedSmallCaves[nextCave]) {
        visitedSmallCaves[nextCave] = 0;
      }
      visitedSmallCaves[nextCave]++;
      if (hasVisitedMoreThanOneSmallCaveTwice(visitedSmallCaves)) {
        visitedSmallCaves[nextCave]--;
        continue;
      }
    }
    path.push(nextCave);
    pathCount = countPathsFrom(nextCave, caveMap, visitedSmallCaves, pathCount, path);
    path.pop();
    if (isSmallCave(nextCave)) {
      visitedSmallCaves[nextCave]--;
    }
  }
  return pathCount;
};

export default countPaths;
