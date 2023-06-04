# Development Guide

- Install packages with `npm install`.
- Press `F5` to open a new (Host) window with your extension loaded.
- `src/extension.ts` is the main file containing the core extension code.
- If you make any changes, run "Developer: Reload Window" from the command palette (`Cmd+Shift+P`) in the Host window for the changes to take effect.
- You can find any output console logs from your extension in the Debug Console.

## Software versions

| Name | Version  |
| ---- | -------- |
| Node | v18.15.0 |
| npm  | 9.5.0    |

## Run tests

- Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
- Press `F5` to run the tests in a new window with your extension loaded.
- See the output of the test result in the debug console.
- Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
  - The provided test runner will only consider files matching the name pattern `**.test.ts`.
  - You can create folders inside the `test` folder to structure your tests any way you want.

## To do

- Reduce the extension size and improve the startup time by [bundling the extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
- Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration#github-actions).
