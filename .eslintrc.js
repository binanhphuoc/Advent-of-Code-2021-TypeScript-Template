module.exports = {
    "env": {
      "browser": true,
      "commonjs": true,
      "es6": true,
      "es2020": true
    },
    "parserOptions": {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module",
    },
    "overrides": [
      {
        "files": ["*.ts"],
        "parser": "@typescript-eslint/parser",
        "plugins": ["@typescript-eslint"],
        "extends": [
          "plugin:@typescript-eslint/recommended",
          "prettier/@typescript-eslint",
          "plugin:prettier/recommended"
        ],
        "rules": {
          "space-before-function-paren": "off",
          "no-multi-str": "off",
          "eol-last": "off"
        },
      }
    ],
    "root": true
  }
  