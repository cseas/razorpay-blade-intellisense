// https://code.visualstudio.com/api/references/vscode-api
import {
  languages,
  CompletionItem,
  CompletionItemKind,
  Range,
  workspace,
  window as vsWindow,
  type TextDocument,
  type Position,
  type ExtensionContext,
  type CompletionItemProvider,
  type DecorationOptions,
} from "vscode";
import { getColorMap } from "./getColorMap";

/**
 * Gets all text until the cursor position and checks if it reads `spacing.`
 * If yes, triggers IntelliSense suggestions for available Blade Spacing tokens.
 */
class SpacingCompletionItemProvider implements CompletionItemProvider {
  public provideCompletionItems(doc: TextDocument, pos: Position) {
    const linePrefix = doc.lineAt(pos).text.slice(0, pos.character);
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
  }
}

// This method is called when the extension is activated.
// Activation events are listed in package.json
export function activate(context: ExtensionContext) {
  /*******************
   * Code completion
   *******************/

  const disposable = languages.registerCompletionItemProvider(
    // https://code.visualstudio.com/docs/languages/identifiers#_known-language-identifiers
    "typescriptreact",
    new SpacingCompletionItemProvider(),
    "." // triggered whenever a '.' is being typed
  );

  context.subscriptions.push(disposable);

  /********************
   * Editor Decoration
   ********************/

  let activeEditor = vsWindow.activeTextEditor;
  const colorMap = getColorMap();

  function updateDecoration(tokenName: RegExp) {
    if (!activeEditor) {
      return;
    }

    const text = activeEditor.document.getText();
    const matchedTokens: DecorationOptions[] = [];
    let match;

    while ((match = tokenName.exec(text))) {
      const startPos = activeEditor.document.positionAt(match.index);
      const endPos = activeEditor.document.positionAt(
        match.index + match[0].length
      );

      const decoration = {
        range: new Range(startPos, endPos),
        hoverMessage: colorMap.get(tokenName)?.colorValue,
      };

      matchedTokens.push(decoration);
    }

    activeEditor.setDecorations(
      colorMap.get(tokenName)!.colorTextEditorDecorationType,
      matchedTokens
    );
  }

  function updateDecorations() {
    for (let tokenName of colorMap.keys()) {
      updateDecoration(tokenName);
    }
  }

  if (activeEditor) {
    updateDecorations();
  }

  vsWindow.onDidChangeActiveTextEditor(
    (editor) => {
      activeEditor = editor;
      if (editor) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );

  workspace.onDidChangeTextDocument(
    (event) => {
      if (activeEditor && event.document === activeEditor.document) {
        updateDecorations();
      }
    },
    null,
    context.subscriptions
  );
}
