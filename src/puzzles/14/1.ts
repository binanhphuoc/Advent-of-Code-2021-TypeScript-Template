import lodash from "lodash";
import { addEdge, Id, incrementCount, ParsedInput } from "./parser";

type State = { adj: Record<string, Record<string, number>>; count: Record<string, number> };

const applyRule = ({ adj }: State, rule: [string, string, string], dirty: State) => {
  if (rule[Id.L1] in adj && rule[Id.L2] in adj[rule[Id.L1]]) {
    const times = adj[rule[Id.L1]][rule[Id.L2]];
    addEdge([rule[Id.L1], rule[Id.R]], dirty.adj, times);
    addEdge([rule[Id.R], rule[Id.L2]], dirty.adj, times);
    dirty.adj[rule[Id.L1]][rule[Id.L2]] -= times;
    incrementCount(rule[Id.R], dirty.count, times);
  }
};

const solve = (input: ParsedInput) => {
  for (let {} of lodash.range(40)) {
    const dirty = lodash.cloneDeep({ adj: input.adj, count: input.count });
    for (const rule of input.rules) {
      applyRule(input, rule, dirty);
    }
    input = {
      ...input,
      ...dirty
    };
  }
  return Math.max(...Object.values(input.count)) - Math.min(...Object.values(input.count));
};

export default solve;
