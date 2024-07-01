
export function extractIndentifiers(text: string, pattern: RegExp, matchIndex: number): string[] {
    const indentifiers: string[] = [];
    let match;

    while ((match = pattern.exec(text)) !== null) {
        indentifiers.push(match[matchIndex]);
    }

    return indentifiers;
}

