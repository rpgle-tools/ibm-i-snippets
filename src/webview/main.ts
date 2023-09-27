import { provideVSCodeDesignSystem, vsCodeButton, Button, vsCodeTextField, TextField } from "@vscode/webview-ui-toolkit";
import * as vs from 'vscode';

provideVSCodeDesignSystem().register(vsCodeButton(),vsCodeTextField());

const vscode = acquireVsCodeApi();

window.addEventListener("load", main);

// Main function that gets executed once the webview DOM loads
function main() {
  // To get improved type annotations/IntelliSense the associated class for
  // a given toolkit component can be imported and used to type cast a reference
  // to the element (i.e. the `as Button` syntax)
  const howdyButton = document.getElementById("howdy") as Button;
  howdyButton?.addEventListener("click", () => handleHowdyClick());
}

// Callback function that is executed when the howdy button is clicked
function handleHowdyClick() {
  const factor1 = document.getElementById("factor1") as TextField;
  const factor2 = document.getElementById("factor2") as TextField;
  const opcode = document.getElementById("opcode") as TextField;
  const result = document.getElementById("result") as TextField;
  const spec = {
    factor1 : factor1.value,
    factor2 : factor2.value,
    opcode : opcode.value,
    result : result.value,
  };
  vscode.postMessage({
    command: "hello",
    payload: {...spec,text: "Hey there partner! 🤠"}
  });
}