import { Disposable, Position, Range, Uri, ViewColumn, WebviewPanel, extensions, window } from "vscode";
import { UiElement } from "./Ui";
import { CFormatter } from "../../cspec/CFormatter";

export class ColumnAssistant extends UiElement{
  
  public static currentPanel: ColumnAssistant | undefined;

  private constructor(panel:WebviewPanel, extensionUri:Uri){
    super(panel,extensionUri,"edit-rpgle-columns.html","ColumnAsistant");
  }

  protected override onMessageHandler(command: any, payload: {factor1:string,factor2:string,opcode:string,result:string,text:string}): void {
    if(command === "hello"){
      window.showInformationMessage(payload.text);
      const editor = window.visibleTextEditors[0];
      if (!editor) {
        return;
      }
      const selection = editor.selection;
      editor.edit((edit)=>{
        const range = editor.document.lineAt(selection.active.line).range;
        const formatter = new CFormatter();
        const replaceString = formatter.format(payload.opcode,[],payload.factor1,payload.factor2,payload.result);
        edit.replace(range,replaceString);
      });
    }
    else if (command === "updateColumnInformation"){
      window.showErrorMessage("Your data sucks");
    }
  }

  static onUpdate(){
    if (ColumnAssistant.currentPanel && ColumnAssistant.currentPanel._panel.visible) {
      ColumnAssistant.currentPanel.update();
    }
  }

  protected override onDisposeOccurs(){
    ColumnAssistant.currentPanel = undefined;
  }

  public static render(extensionUri: Uri) {
    if (ColumnAssistant.currentPanel) {
      // If the webview panel already exists reveal it
      ColumnAssistant.currentPanel._panel.reveal(ViewColumn.Two);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = window.createWebviewPanel(
        'rpgui',
        'RPG-Ui|Editor',
        // The editor column the panel should be displayed in
        ViewColumn.Two,
        // Extra panel configurations
        {
          // Enable JavaScript in the webview
          enableScripts: true,
          // Restrict the webview to only load resources from the `out` directory
          localResourceRoots: [Uri.joinPath(extensionUri, "out")],
        }
      );

      ColumnAssistant.currentPanel = new ColumnAssistant(panel, extensionUri);
    }
  }

}
