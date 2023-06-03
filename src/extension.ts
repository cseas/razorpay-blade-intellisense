// https://code.visualstudio.com/api/references/vscode-api
import {
  languages,
  CompletionItem,
  CompletionItemKind,
  type TextDocument,
  type Position,
  type ExtensionContext,
  type CompletionItemProvider,
  type CancellationToken,
} from "vscode";

// class BladeCompletionItemProvider implements CompletionItemProvider {
//   public provideCompletionItems(
//     document: TextDocument,
//     position: Position,
//     token: CancellationToken
//   ): Thenable<CompletionItem[]>
//   > {
// 	}
// }

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "razorpay-blade-intellisense" is now active!'
  );

  const provider = languages.registerCompletionItemProvider(
    // https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
    "typescriptreact",
    {
      // get all text until the `position` and check if it reads `spacing.`
      // and if so then trigger suggestions for available tokens.
      provideCompletionItems(doc: TextDocument, pos: Position) {
        const linePrefix = doc.lineAt(pos).text.substr(0, pos.character);
        if (!linePrefix.endsWith("spacing.")) {
          return undefined;
        }

        let completionItems = [];
        const tokenValues = [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56];

        // Add completion suggestions
        for (let i = 0; i < 12; i++) {
          completionItems.push(
            new CompletionItem(String(i), CompletionItemKind.Value)
          );
        }

        // Add token values as details
        for (let i = 0; i < 12; i++) {
          completionItems[i].detail = `${tokenValues[i]}px`;
        }

        return completionItems;
      },
    },
    "." // triggered whenever a '.' is being typed
  );

  context.subscriptions.push(provider);
}

// This method is called when your extension is deactivated
export function deactivate() {}
