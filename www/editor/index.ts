import * as CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/search.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/jump-to-line.js";
import "codemirror/addon/display/fullscreen.js";
import "codemirror/addon/display/fullscreen.css";
import "codemirror/mode/javascript/javascript";

const createEditor = (id: string) => {
    const editor = CodeMirror.fromTextArea(document.getElementById(id) as HTMLTextAreaElement, {
        indentUnit: 2,
        lineNumbers: true,
        mode: {name: "javascript", json: true},
        smartIndent: true,
        viewportMargin: 1,
        extraKeys: {
            "Alt-F": "findPersistent",
            "F11": function (cm: any) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm: any) {
                if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
            }
        }
    });

    editor.setSize(null, 400);

    return editor;
};

const autoFormat = (editor: CodeMirror.EditorFromTextArea) => {
    editor.setValue(JSON.stringify(JSON.parse(editor.getValue()), null, 2));
    editor.save();
};

export {createEditor, autoFormat}
