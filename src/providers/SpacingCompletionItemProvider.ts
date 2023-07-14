import {
  CompletionItem,
  CompletionItemKind,
  type TextDocument,
  type Position,
  type CompletionItemProvider,
} from "vscode";

/**
 * Gets all text until the cursor position and checks if it reads `spacing.`
 * If yes, triggers IntelliSense suggestions for available Blade Spacing tokens.
 */
export class SpacingCompletionItemProvider implements CompletionItemProvider {
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
