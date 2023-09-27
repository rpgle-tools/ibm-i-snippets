import * as vscode from 'vscode';
import { COrchestrator } from './cspec/COrchestrator';
import { ColumnAssistant } from './ui/components/ColumnAsisstant';
import { CFormatter } from './cspec/CFormatter';
import { EditorSelector } from './utils/EditorSelectors';
import { CType } from './cspec/CType';

export function activate(context: vscode.ExtensionContext) {

	let cSpecsOrchestator = vscode.commands.registerCommand('snippets-for-ibm-i-languages.showCSpec', () => {
		const orchestrator = new COrchestrator();
		orchestrator.orchestrate();
	});

	let cSpecsOrchestatorEdit = vscode.commands.registerCommand('snippets-for-ibm-i-languages.editCSpec', () => {
		const editor = new EditorSelector(vscode.window.activeTextEditor);
		const formater:CFormatter = new CFormatter();
		const currentLine = editor.getCurrentLine();
		if (!currentLine.status){
			vscode.window.showErrorMessage("You have to open an editor window to use this functionality");
			return;
		}
		const ctype:CType = formater.read(editor.getCurrentLine().text);
		const orchestrator = new COrchestrator(ctype);
		orchestrator.setEditMode();
		orchestrator.orchestrate();
	});

	let editRpgleUi = vscode.commands.registerCommand('snippets-for-ibm-i-languages.showRpgleUiEditor', () => {
		ColumnAssistant.render(context.extensionUri);
		vscode.window.onDidChangeTextEditorSelection(()=>{
			const selectedText = vscode.window.activeTextEditor?.document.lineAt(vscode.window.activeTextEditor.selection.start.line).text;
			console.log(selectedText);
			ColumnAssistant.onUpdate();
		});
	});

	context.subscriptions.push(cSpecsOrchestator);
	context.subscriptions.push(cSpecsOrchestatorEdit);
	context.subscriptions.push(editRpgleUi);
}


// This method is called when your extension is deactivated
export function deactivate() {}
