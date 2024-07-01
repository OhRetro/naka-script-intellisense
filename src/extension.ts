import * as vscode from "vscode";
import { extractIndentifiers } from "./utils";

export function activate(context: vscode.ExtensionContext) {
    const completionProvider = vscode.languages.registerCompletionItemProvider(
        { language: "naka-script", scheme: "file" },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const text = document.getText();
                var completionItems: vscode.CompletionItem[] = [];
                
                const builtinFunctions = [
                    "print",
                    "clear",
                    "run",
                    "import",
                    "toString",
                    "input",
                    "inputNumber",
                    "isNumber",
                    "isString",
                    "isList",
                    "isFunction",
                    "randomInt"
                ];
                

                const keywords = [
                    "while",
                    "for",
                    "return",
                    "continue",
                    "break",
                    "if",
                    "elseif",
                    "else",
                    "and",
                    "or",
                    "not",
                    "then",
                    "end",
                    "to",
                    "step",
                    "delvar",
                    "is",
                    "var", "const", "func", "class",
                    "true", "false", "null"
                ];
                
                builtinFunctions.forEach((builtinFunction) => {
                    completionItems.push(
                        new vscode.CompletionItem(builtinFunction, vscode.CompletionItemKind.Function)
                    );
                });

                keywords.forEach((keyword) => {
                    completionItems.push(
                        new vscode.CompletionItem(keyword, vscode.CompletionItemKind.Keyword)
                    )
                });

                const variablePattern = /\b(const)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const variables = extractIndentifiers(text, variablePattern, 2);

                variables.forEach(variable => {
                    completionItems.push(
                        new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable)
                    );
                });

                const constantPattern = /\b(const)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const constants = extractIndentifiers(text, constantPattern, 2);

                constants.forEach(constant => {
                    completionItems.push(
                        new vscode.CompletionItem(constant, vscode.CompletionItemKind.Constant)
                    );
                });

                const functionPattern = /\b(func)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const functions = extractIndentifiers(text, functionPattern, 2);

                functions.forEach(function_ => {
                    completionItems.push(
                        new vscode.CompletionItem(function_, vscode.CompletionItemKind.Function)
                    );
                });

                const classesPattern = /\b(class)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const classes = extractIndentifiers(text, classesPattern, 2);

                classes.forEach(class_ => {
                    completionItems.push(
                        new vscode.CompletionItem(class_, vscode.CompletionItemKind.Class)
                    );
                });

                return completionItems;
            }
        }
    );

    context.subscriptions.push(completionProvider);

    const hoverProvider = vscode.languages.registerHoverProvider(
        { language: "naka-script", scheme: "file" },
        {
            provideHover(document: vscode.TextDocument, position: vscode.Position) {
                const wordRange = document.getWordRangeAtPosition(position);
                const word = document.getText(wordRange);
                const text = document.getText();

                const builtinFunctions = [
                    "print",
                    "clear",
                    "run",
                    "import",
                    "toString",
                    "input",
                    "inputNumber",
                    "isNumber",
                    "isString",
                    "isList",
                    "isFunction",
                    "randomInt"
                ];

                if (builtinFunctions.includes(word)) {
                    const hoverText = new vscode.MarkdownString(`(builtin function) ${word}`);
                    return new vscode.Hover(hoverText, wordRange);
                }

                const variablePattern = /\b(var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const variables = extractIndentifiers(text, variablePattern, 2);

                if (variables.includes(word)) {
                    const hoverText = new vscode.MarkdownString(`(variable) ${word}`);
                    return new vscode.Hover(hoverText, wordRange);
                }

                const constantPattern = /\b(const)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const constants = extractIndentifiers(text, constantPattern, 2);

                if (constants.includes(word)) {
                    const hoverText = new vscode.MarkdownString(`(constant) ${word}`);
                    return new vscode.Hover(hoverText, wordRange);
                }

                const functionPattern = /\b(func)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const functions = extractIndentifiers(text, functionPattern, 2);

                if (functions.includes(word)) {
                    const hoverText = new vscode.MarkdownString(`(function) ${word}`);
                    return new vscode.Hover(hoverText, wordRange);
                }

                const classesPattern = /\b(class)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const classes = extractIndentifiers(text, classesPattern, 2);

                if (classes.includes(word)) {
                    const hoverText = new vscode.MarkdownString(`(class) ${word}`);
                    return new vscode.Hover(hoverText, wordRange);
                }

                return undefined;
            }
        }
    );

    context.subscriptions.push(hoverProvider);
}
