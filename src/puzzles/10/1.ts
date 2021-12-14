import { entries } from "../../utils";

const pairs = {
  "<": ">",
  "[": "]",
  "{": "}",
  "(": ")"
};

const errorScore = {
  ">": 25137,
  "]": 57,
  "}": 1197,
  ")": 3
};

export default (lines: string[][]) => {
  let score = 0;
  for (const line of lines) {
    const stack: string[] = [];
    for (const [, letter] of entries<string>(line)) {
      if (letter in pairs) {
        stack.push(letter);
      } else {
        const pendingOpenBracket = stack.pop() as keyof typeof pairs;
        if (pairs[pendingOpenBracket] !== letter) {
          score += errorScore[letter as keyof typeof errorScore];
        }
      }
    }
  }

  return score;
};
