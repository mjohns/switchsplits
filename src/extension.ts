// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { window } from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('switchsplits.switchEditor', () => {
		// The code you place here will be executed every time your command is executed

		let viewColumn: vscode.ViewColumn = vscode.ViewColumn.One;
		if (window.activeTextEditor?.viewColumn === vscode.ViewColumn.One) {
			viewColumn = vscode.ViewColumn.Two;
		}
		let textEditors = vscode.window.visibleTextEditors.filter(editor => editor.viewColumn === viewColumn);
		if (vscode.window.visibleTextEditors.length > 0) {
			textEditors.push(vscode.window.visibleTextEditors[0]);
		}
		if (textEditors.length === 0) {
			vscode.window.showInformationMessage('No editor to switch to');
			return;
		}
		const textEditor: vscode.TextEditor = textEditors[0];
		window.showTextDocument(textEditor.document, textEditor.viewColumn);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
