import * as codeEditor from "./editor";
import "./fonts/index.css";
import "./index.html";
import { etiqueta } from "./label";
import "./styles.css";

const editor = codeEditor.createEditor("code");

document.getElementById("autoformat-btn").onclick = () => {
    codeEditor.autoFormat(editor);
};

document.getElementById("create-btn").onclick = () => {
    etiqueta.create("canvas-area", JSON.parse(editor.getValue()));
};

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("create-btn").click();
});
