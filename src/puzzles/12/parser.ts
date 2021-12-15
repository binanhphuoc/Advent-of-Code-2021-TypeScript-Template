import { ParserUtil } from "../../utils";

const parse = (input: string): Record<string, Array<string>> => {
  const parserUtil = new ParserUtil(input);
  const edgesMap = {} as Record<string, Array<string>>;
  for (const edge of parserUtil.nextBlock("-") as string[][]) {
    if (!edgesMap[edge[0]]) {
      edgesMap[edge[0]] = [];
    }
    if (!edgesMap[edge[1]]) {
      edgesMap[edge[1]] = [];
    }
    edgesMap[edge[0]].push(edge[1]);
    edgesMap[edge[1]].push(edge[0]);
  }

  return edgesMap;
};

export default parse;
