import { ParserUtil } from "../../utils";

export type ParsedInput = {
  adj: Record<string, Record<string, number>>;
  rules: Array<[string, string, string]>;
  count: Record<string, number>;
};

export const addEdge = (
  [first, second]: [string, string],
  adj: Record<string, Record<string, number>>,
  times?: number
) => {
  if (!(first in adj)) {
    adj[first] = {};
  }
  if (!(second in adj[first])) {
    adj[first][second] = times ?? 1;
  } else {
    adj[first][second] += times ?? 1;
  }
};

export enum Id {
  L1,
  L2,
  R
}

export const incrementCount = (element: string, count: Record<string, number>, times?: number) => {
  if (!(element in count)) {
    count[element] = times ?? 1;
  } else {
    count[element] += times ?? 1;
  }
};

const parse = (input: string): ParsedInput => {
  const result: ParsedInput = {
    adj: {},
    rules: [],
    count: {}
  };

  const parserUtil = new ParserUtil(input);
  (parserUtil.nextBlock("") as string[]).forEach((val, index, arr) => {
    incrementCount(val, result.count);
    if (index + 1 < arr.length) {
      addEdge([val, arr[index + 1]], result.adj);
    }
  });

  result.rules = (parserUtil.nextBlock("->") as Array<[string, string]>).map(([leftSide, rightSide]) => [
    ...leftSide.split(""),
    rightSide
  ]) as Array<[string, string, string]>;
  return result;
};

export default parse;
