export function is2d<T>(input: T[] | T[][] | null): boolean {
  return input !== null && input.length !== 0 && Array.isArray(input[0]);
}

export function is1d<T>(input: T[] | T[][] | null): boolean {
  return input !== null && (input.length === 0 || !Array.isArray(input[0]));
}

export function as2d<T>(input: T[] | T[][] | null): T[][] {
  if (!is2d(input)) {
    throw new Error("Not a 2d array.");
  }
  return input as T[][];
}

export function as1d<T>(input: T[] | T[][] | null): T[] {
  if (!is1d(input)) {
    throw new Error("Not a 1d array.");
  }

  return input as T[];
}

/**
 * [ i0, i1, i2, etc. ]
 */
type Coordinate = Array<number>;
// eslint-disable-next-line
export function entries<T>(arr: any): Array<[Coordinate, T]> {
  const result: Array<[Coordinate, T]> = [];
  if (is2d(arr)) {
    (arr as T[][]).forEach((row, i0) =>
      row.forEach((val, i1) => {
        result.push([[i0, i1], val]);
      })
    );
  } else {
    (arr as T[]).forEach((val, i0) => {
      result.push([[i0], val]);
    });
  }
  return result;
}

// eslint-disable-next-line
export function map<T>(arr: any, mapper: (value: T, ...indexes: number[]) => any): any {
  if (is2d(arr)) {
    return (arr as T[][]).map((row, i0) => row.map((val, i1) => mapper(val, i0, i1)));
  } else {
    return (arr as T[]).map((val, i0) => mapper(val, i0));
  }
}
