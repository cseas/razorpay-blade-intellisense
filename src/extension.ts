// https://code.visualstudio.com/api/references/vscode-api
import {
  languages,
  Range,
  workspace,
  window as vsWindow,
  type ExtensionContext,
  type DecorationOptions,
} from "vscode";
import { getColorMap } from "./getColorMap";
import { SpacingCompletionItemProvider } from "./providers/SpacingCompletionItemProvider";

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
