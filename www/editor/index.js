"use strict";
exports.__esModule = true;
var CodeMirror = require("codemirror");
require("codemirror/lib/codemirror.css");
require("codemirror/addon/dialog/dialog.js");
require("codemirror/addon/dialog/dialog.css");
require("codemirror/addon/search/search.js");
require("codemirror/addon/search/matchesonscrollbar.js");
require("codemirror/addon/search/searchcursor.js");
require("codemirror/addon/search/jump-to-line.js");
require("codemirror/addon/display/fullscreen.js");
require("codemirror/addon/display/fullscreen.css");
require("codemirror/mode/javascript/javascript");
var createEditor = function (id) {
    var editor = CodeMirror.fromTextArea(document.getElementById(id), {
        indentUnit: 2,
        lineNumbers: true,
        mode: { name: "javascript", json: true },
        smartIndent: true,
        viewportMargin: 1,
        extraKeys: {
            "Alt-F": "findPersistent",
            "F11": function (cm) {
                cm.setOption("fullScreen", !cm.getOption("fullScreen"));
            },
            "Esc": function (cm) {
                if (cm.getOption("fullScreen"))
                    cm.setOption("fullScreen", false);
            }
        }
    });
    editor.setSize(null, 400);
    return editor;
};
exports.createEditor = createEditor;
var autoFormat = function (editor) {
    editor.setValue(JSON.stringify(JSON.parse(editor.getValue()), null, 2));
    editor.save();
};
exports.autoFormat = autoFormat;
//# sourceMappingURL=index.js.map