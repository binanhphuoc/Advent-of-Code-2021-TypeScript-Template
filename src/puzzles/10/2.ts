import lodash from "lodash";
import { entries } from "../../utils";

const pairs = {
  "<": ">",
  "[": "]",
  "{": "}",
  "(": ")"
};

const points = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4
};

export default (lines: string[][]) => {
  let scoreList = [];
  for (const [_, line] of lodash.entries(lines)) {
    const stack = [];
    let corrupted = false;
    for (const [_, letter] of entries<string>(line)) {
      if (letter in pairs) {
        stack.push(letter);
      } else {
        const pendingOpenBracket = stack.pop();
        if (pairs[pendingOpenBracket as keyof typeof pairs] !== letter) {
          corrupted = true;
          break;
        }
      }
    }

    if (corrupted || stack.length === 0) {
      continue;
    }

    let score = 0;
    while (stack.length > 0) {
      const bracketToAdd = pairs[stack.pop() as keyof typeof pairs];
      score = score * 5 + points[bracketToAdd as keyof typeof points];
    }
    scoreList.push(score);
  }

  scoreList = scoreList.sort((a, b) => a - b);
  return scoreList[Math.floor(scoreList.length / 2)];
};
