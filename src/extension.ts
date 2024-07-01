import * as vscode from "vscode";
import { extractIndentifiers, createCompletionItem } from "./utils";

export function activate(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        { language: "naka-script", scheme: "file" },
        {
            provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
                const text = document.getText();
                var completionItems: vscode.CompletionItem[] = [];
                
                const builtinFunctions = [
                    { name: "print", returnType: "void" },
                    { name: "clear", returnType: "void" },
                    { name: "run", returnType: "void" },
                    { name: "import", returnType: "void" },

                    { name: "toString", returnType: "string" },

                    { name: "input", returnType: "string" },
                    { name: "inputNumber", returnType: "number" },
                    
                    { name: "isNumber", returnType: "boolean" },
                    { name: "isString", returnType: "boolean" },
                    { name: "isList", returnType: "boolean" },
                    { name: "isFunction", returnType: "boolean" },

                    { name: "randomInt", returnType: "number" }
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
                
                builtinFunctions.forEach(({ name, returnType }) => {
                    completionItems.push(
                        createCompletionItem(name, vscode.CompletionItemKind.Function, returnType)
                    );
                });

                keywords.forEach((element: string) => {
                    completionItems.push(
                        new vscode.CompletionItem(element, vscode.CompletionItemKind.Keyword)
                    )
                });

                const variablePattern = /\b(var|const)\s+([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
                const variables = extractIndentifiers(text, variablePattern, 2);

                variables.forEach(variable => {
                    completionItems.push(
                        new vscode.CompletionItem(variable, vscode.CompletionItemKind.Variable)
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

    context.subscriptions.push(provider);
}
