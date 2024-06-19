import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        { language: 'javascript', scheme: 'file' },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const completionItems = [
                    new vscode.CompletionItem('HelloWorld', vscode.CompletionItemKind.Function)
                ];
                return completionItems;
            }
        }
    );
    context.subscriptions.push(provider);
}
