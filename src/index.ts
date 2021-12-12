import fs from "fs-extra";
import inquirer from "inquirer";

const loop = async (): Promise<void> => {
  console.clear();
  return inquirer
    .prompt([
      {
        type: "input",
        name: "puzzle",
        message: "Puzzle"
      }
    ])
    .then(({ puzzle }) => {
      const [day, part] = puzzle.split("-");
      const areBothPartsInSameFolder = fs.existsSync(`${process.cwd()}/src/puzzles/${day}`);
      const folderName = areBothPartsInSameFolder ? day : puzzle;
      return Promise.all([
        fs.readFileSync(`${process.cwd()}/src/puzzles/${folderName}/input.txt`, "utf8"),
        import(`${__dirname}/puzzles/${folderName}/parser`),
        import(`${__dirname}/puzzles/${folderName}/${areBothPartsInSameFolder ? part : "solver"}`)
      ]);
    })
    .then(([rawInputTxt, { default: parse }, { default: solve }]) => {
      console.log(solve(parse(rawInputTxt)));
    })
    .catch(async (err) => {
      console.error(err);
    })
    .then(function cleanUpPuzzleModules() {
      // This is important when we edit a puzzle
      // and want the import() statement to use this
      // edited version instead of what in the cache
      Object.keys(require.cache).forEach((filePath) => {
        if (filePath.indexOf(`${process.cwd()}/src/puzzles`) !== -1) {
          delete require.cache[filePath];
        }
      });
    })
    .then(() => {
      return inquirer.prompt([
        {
          type: "confirm",
          name: "shouldSolveNextPuzzle",
          message: "Another puzzle? [Enter to continue]"
        }
      ]);
    })
    .then(({ shouldSolveNextPuzzle }) => {
      if (shouldSolveNextPuzzle) {
        return loop();
      }
    });
};

loop();
