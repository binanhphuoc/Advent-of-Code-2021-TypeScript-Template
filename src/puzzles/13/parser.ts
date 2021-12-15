import { map, ParserUtil } from "../../utils";

const parse = (
  input: string
): {
  dot: Array<number[]>;
  fold: Array<[string, number]>;
} => {
  const result = {
    dot: [] as Array<number[]>,
    fold: [] as Array<[string, number]>
  };

  const parserUtil = new ParserUtil(input);
  result.dot = map<string>(parserUtil.nextBlock(), (val) => parseInt(val));

  for (const [instTxt, lineNum] of parserUtil.nextBlock("=") as string[][]) {
    result.fold.push([instTxt.charAt(instTxt.length - 1), parseInt(lineNum)]);
  }

  return result;
};

export default parse;
