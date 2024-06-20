import * as vscode from "vscode";

export function extractIndentifiers(text: string, pattern: RegExp, matchIndex: number): string[] {
    const indentifiers: string[] = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
        indentifiers.push(match[matchIndex]);
    }

    return indentifiers;
}

export function createCompletionItem(name: string, kind: vscode.CompletionItemKind, returnType?: string): vscode.CompletionItem {
    const item = new vscode.CompletionItem(name, kind);
    if (returnType) {
        item.documentation = new vscode.MarkdownString(`\`${name}\` returns \`${returnType}\``);
    }
    return item;
}
