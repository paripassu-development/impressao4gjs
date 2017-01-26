import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";

const createEditor = (id: string) => {
    const editor = CodeMirror.fromTextArea(document.getElementById(id) as HTMLTextAreaElement, {
        indentUnit: 2,
        lineNumbers: true,
        mode: {name: "javascript", json: true},
        smartIndent: true,
        viewportMargin: 1,
    });

    editor.setSize(null, 150);

    return editor;
};

const autoFormat = (editor: CodeMirror.EditorFromTextArea) => {
    editor.setValue(JSON.stringify(JSON.parse(editor.getValue()), null, 2));
    editor.save();
};

export {createEditor, autoFormat}
