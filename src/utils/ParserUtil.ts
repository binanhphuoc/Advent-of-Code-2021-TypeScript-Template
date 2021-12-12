export class ParserUtil {
  private input = "";

  constructor(input: string) {
    this.input = input;
  }

  hasNextBlock(): boolean {
    return this.input.trim() !== "";
  }

  nextBlock(delim?: string | RegExp): string[] | string[][] | null {
    this.input = this.input.trimLeft();
    const block: string[][] = [];

    let line = this.nextLine(delim);
    while (line !== null) {
      block.push(line);
      line = this.nextLine(delim);
    }

    return block.length > 0 ? (block.length === 1 ? block[0] : block) : null;
  }

  nextLine(delim?: string | RegExp): string[] | null {
    if (this.input === "") {
      return null;
    }

    let lineTxt = "";
    if (this.input.indexOf("\n") > -1) {
      lineTxt = this.input.substring(0, this.input.indexOf("\n")).trim();
    } else {
      lineTxt = this.input.trim();
    }

    if (lineTxt === "") {
      return null;
    }

    let splitArr: string[];
    if (delim !== undefined) {
      splitArr = lineTxt.split(delim).map((elementTxt) => elementTxt.trim());
    } else {
      splitArr = lineTxt.split(",").map((elementTxt) => elementTxt.trim());
      if (splitArr.length === 1) {
        splitArr = lineTxt.split(/\s+/).map((elementTxt) => elementTxt.trim());
      }
    }

    if (this.input.indexOf("\n") > -1) {
      this.input = this.input.substring(this.input.indexOf("\n") + 1);
    } else {
      this.input = "";
    }

    return splitArr;
  }
}
