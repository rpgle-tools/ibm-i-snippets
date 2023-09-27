import * as vscode from "vscode";

export abstract class UiElement {
  protected readonly _panel: vscode.WebviewPanel;
  protected _disposables: vscode.Disposable[] = [];
  protected title:string;
  protected panelUri:vscode.Uri;
  protected webviewUri:vscode.Uri;
  protected nonce:string;
  protected extraContent:string;

  constructor(panel:vscode.WebviewPanel, extensionUri:vscode.Uri,panelFile:string,actions:string){
    this.extraContent = "";
    this._panel = panel;
    this._panel.onDidDispose(()=>this.dispose(),null,this._disposables);
    this.webviewUri = this.getUri(panel.webview, extensionUri, ["out","webview.js"]);
    this.panelUri = vscode.Uri.joinPath(extensionUri, "out", "ui", "web",panelFile);
    this.nonce = this.getNonce();
    this.title = 'Column Assist';
    this.getView(this._panel);
    this.setWebviewMessageListener(this._panel.webview);
  }

  private getView(panel:vscode.WebviewPanel){
    vscode.workspace.openTextDocument(this.panelUri).then((document)=>{
      panel.webview.html = this._getWebviewContent(this.title,document.getText(),this.nonce,this.webviewUri);
    });
  }

  protected getUri(webview: vscode.Webview, extensionUri: vscode.Uri, pathList: string[]) {
    return webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, ...pathList));
  }

  protected getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  private _getWebviewContent(title:string,content:string,nonce:string,script:vscode.Uri) {

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
    
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
					<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'nonce-${nonce}';">
          <title>${title}</title>
        </head>
        <body>
          ${this.extraContent}
					<script type="module" nonce="${nonce}" src="${script}"></script>
        </body>
      </html>
    `;
  }

  protected abstract onMessageHandler(command:any,payload:any):void;
  protected abstract onDisposeOccurs():void;

  protected setWebviewMessageListener(webview: vscode.Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const payload:any = message.payload;
        this.onMessageHandler(command,payload);
      },
      undefined,
      this._disposables
    );
  }

  protected update(){
    const selectedText = vscode.window.activeTextEditor?.document.lineAt(vscode.window.activeTextEditor.selection.start.line).text;
    this.extraContent = "<h1>Unsupported spec</h1>";
    if (selectedText?.charAt(5).toUpperCase() === 'C'){
      this.extraContent = `
        <h1>Hello World!</h1>
        <vscode-text-field id="factor1" value="${selectedText.substring(11,24)}">factor 1</vscode-text-field>
        <vscode-text-field id="opcode"  value="${selectedText.substring(25,34)}">operation code</vscode-text-field>
        <vscode-text-field id="factor2" value="${selectedText.substring(35,48)}">factor 2</vscode-text-field>
        <vscode-text-field id="result"  value="${selectedText.substring(49,63)}">result</vscode-text-field>
        <vscode-button id="howdy">Howdy!</vscode-button>
      `;
    }

    this.getView(this._panel);
  }

  public dispose(){
    this.onDisposeOccurs();
    this._panel.dispose();
    while(this._disposables.length){
      const disposable = this._disposables.pop();
      if(disposable){
        disposable.dispose();
      }
    }
  }

}