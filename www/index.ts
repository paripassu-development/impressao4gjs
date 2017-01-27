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
        codigoRastreamento: "PN7NWCJ0FERB9DH0",
        codigoRastreamentoNumerico: "321321321321",
        complemento: "complemento complemento",
        complementoFornecedor: "complemento fornecedor",
        dataEmbalagem: "26/01/2017",
        dataEntrega: "03/07/2013",
        dataFabricacao: "26/01/2017",
        dataValidade: "04/07/2013",
        documentoFornecedor: "321321321321",
        ean13: "9780201485677",
        localizacaoFornecedor: "localização fornecedor",
        logradouroFornecedor: "logradouro fornecedor logradouro fornecedor logradouro fornecedor",
        nomeEmpresa: "Abacateiros do Sul",
        numeroFornecedor: "numero fornecedor",
        site: "paripassu.com.br",
        telefone: "48 99889988",
        textoProduto: "Tomate 2A LC CD KG - Tomate 2A LC CD KG",
        urlQrCode: "http://pqr.io?c=PNBJ20AIR1IR1ABT&p=152&u=kg&k=1",
    });
};

document.getElementById("export-btn").onclick = () => {
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const img = canvas.toDataURL("image/png", 1.0);
    document.getElementById("export").innerHTML = "<img src=\"" + img + "\"/>";
};

document.addEventListener("DOMContentLoaded", (event) => {
    editor.setValue(JSON.stringify(
        {
            "impressao": {
                "resolucaoDpi": 203,
            },
            "etiqueta": {
                "dimensoes": {
                    "alturaMm": 25,
                    "larguraMm": 40,
                },
            },
            "desenho": {
                "elementos": [
                    {
                        "tipo": "qrcode",
                        "posicao": {
                            "xMm": 25,
                            "yMm": 7,
                        },
                        "dimensoes": {
                            "larguraMm": 13,
                            "alturaMm": 13,
                        },
                        "valor": "{{{urlQrCode}}}",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 25,
                            "yMm": 6.5,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 13,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 1.9,
                            "negrito": true,
                        },
                        "valor": "BY PARIPASSU",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 4.5,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 35,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 3,
                            "negrito": true,
                        },
                        "valor": "{{{textoProduto}}}",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 6.5,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 2.2,
                            "negrito": true,
                            "forcaContorno": 2,
                        },
                        "valor": "RASTREAMENTO/LOTE",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 9,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 2.8,
                            "negrito": true,
                            "forcaContorno": 2,
                        },
                        "valor": "{{{codigoRastreamento}}}",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 12,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 2.0,
                            "negrito": true,
                        },
                        "valor": "DATA DE ENTREGA",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 15,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 3.2,
                            "negrito": true,
                            "forcaContorno": 2,
                        },
                        "valor": "{{{dataEntrega}}}",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 17.5,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 2.0,
                            "negrito": true,
                        },
                        "valor": "DATA DE VALIDADE",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 20,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 22.5,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 3.2,
                            "negrito": true,
                            "forcaContorno": 2,
                        },
                        "valor": "{{{dataValidade}}}",
                        "fn": "caixaAlta",
                    },
                    {
                        "tipo": "texto",
                        "posicao": {
                            "xMm": 2,
                            "yMm": 23,
                        },
                        "dimensoes": {
                            "larguraMaximaMm": 35,
                        },
                        "fonte": {
                            "nome": "Consolas",
                            "alturaMm": 2.2,
                            "negrito": true,
                            "forcaContorno": 2,
                        },
                        "valor": "RASTREIE EM {{{site}}}",
                        "fn": "caixaAlta",
                    },

                ],
            },
        }));
    codeEditor.autoFormat(editor);

    setTimeout(() => { document.getElementById("create-btn").click(); }, 500);
});
