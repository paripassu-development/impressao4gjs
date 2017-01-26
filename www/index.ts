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

document.getElementById("export-btn").onclick = () => {
    const canvas = document.getElementById("etiqueta-canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png", 1.0);
    document.getElementById("export").innerHTML = "<img src=\"" + img + "\"/>";
};

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("create-btn").click();
});
