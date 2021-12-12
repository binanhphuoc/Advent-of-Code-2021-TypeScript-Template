import { map, ParserUtil } from "../../utils";

const parse = (input: string): number[][] => {
  const parserUtil = new ParserUtil(input);

  return map<string>(parserUtil.nextBlock(""), (val) => parseInt(val, 10));
};

export default parse;
