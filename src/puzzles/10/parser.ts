import { ParserUtil } from "../../utils";

const parse = (input: string): string[][] => {
  const parserUtil = new ParserUtil(input);

  return parserUtil.nextBlock("") as string[][];
};

export default parse;
