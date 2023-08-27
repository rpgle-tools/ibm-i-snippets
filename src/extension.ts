// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { OperationCodeSelector } from './cspec/operationCodeSelector';
import { FactorSelector } from './cspec/Factor';
import { CSpecFormatter } from './cspec/CSpecFormatter';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "cspec" is now active!');
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('snippets-for-ibm-i-languages.showCSpec', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (!editor){
			vscode.window.showErrorMessage("Editor does not exists");
			return;
		}

		let opSelector = new OperationCodeSelector();
		let factor1 = new FactorSelector("Insert the name of the factor 1 sentence");
		let factor2 = new FactorSelector("Insert the name of the factor 2 sentence");
		let result = new FactorSelector("Insert the result field");
		let formatter = new CSpecFormatter();
		opSelector.setOnSuccess(async ()=>{
			factor1.selectFactor();
		});
		factor1.setOnSuccess(()=>{
			factor2.selectFactor();
		});
		factor2.setOnSuccess(()=>{
			result.selectFactor();
		});
		result.setOnSuccess(()=>{
			let formattedCSpec = formatter.format(
        opSelector.getOperationCode(),
        factor1.getFactor(),
        factor2.getFactor(),
        result.getFactor()
      );
			vscode.window.showInformationMessage(formattedCSpec);
			editor.edit((edit: { insert: (arg0: any, arg1: string) => void; })=>{
				edit.insert(new vscode.Position(editor.selection.start.line,0),formattedCSpec);
			});

		});
		opSelector.selectOperationCode();
		

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
