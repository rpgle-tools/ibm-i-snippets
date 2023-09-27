import * as vscode from 'vscode';

export class EditorSelector{
  editor:vscode.TextEditor | undefined;
  constructor(editor:vscode.TextEditor | undefined){
    this.editor = editor;
  }
  getCurrentLine():{status:boolean,text:string} {
    if (!this.editor){
      return {
        status:false,
        text: ""
      };
    }
    const currentLine = this.editor.selection.start.line;
    const currentLineText = this.editor.document.lineAt(currentLine).text;
    return {
      status:true,
      text:currentLineText
    };
  }
}

