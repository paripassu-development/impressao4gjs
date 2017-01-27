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
    etiqueta.create("canvas-area-template", JSON.parse(editor.getValue()));
    etiqueta.create("canvas-area", JSON.parse(editor.getValue()), {
        bairroFornecedor: "bairro do fornecedor",
        codigoFornecedor: "1234",
        codigoRastreamento: "JJGADSF7264dSDGGF",
        codigoRastreamentoNumerico: "321321321321",
        complemento: "complemento complemento",
        complementoFornecedor: "complemento fornecedor",
        dataEmbalagem: "26/01/2017",
        dataEntrega: "26/01/2017",
        dataFabricacao: "26/01/2017",
        dataValidade: "26/01/2017",
        documentoFornecedor: "321321321321",
        ean13: "9780201485677",
        localizacaoFornecedor: "localização fornecedor",
        logradouroFornecedor: "logradouro fornecedor logradouro fornecedor logradouro fornecedor",
        nomeEmpresa: "Abacateiros do Sul",
        numeroFornecedor: "numero fornecedor",
        site: "https://www.paripassu.com.br",
        telefone: "48 99889988",
        textoProduto: "texto produto",
        urlQrCode: "https://www.paripassu.com.br",
    });
};

document.getElementById("export-btn").onclick = () => {
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png", 1.0);
    document.getElementById("export").innerHTML = "<img src=\"" + img + "\"/>";
};

document.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("create-btn").click();
});
