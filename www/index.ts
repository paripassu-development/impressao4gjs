import * as codeEditor from "./editor";
import "./fonts/index.css";
import "./index.html";
import { etiqueta } from "./label/index";
import "./styles.css";
declare var require: any;
const _ : any = require('lodash');

const modelEditor = codeEditor.createEditor("code");
const valueEditor = codeEditor.createEditor("values");
const STORAGE_NAMESPACE = "impressao4gjs.etiqueta";
const STORAGE_KEY_MODEL = "lastmodel";
const STORAGE_KEY_VALUES = "lastvalues";

const save = function (model: string, values: string) {
    localStorage.setItem(STORAGE_NAMESPACE+'.'+STORAGE_KEY_MODEL, model);
    localStorage.setItem(STORAGE_NAMESPACE+'.'+STORAGE_KEY_VALUES, values);
};

const getModel = function () {
    let savedModel = localStorage.getItem(STORAGE_NAMESPACE+'.'+STORAGE_KEY_MODEL);
    return _.isEmpty(savedModel) ? null : savedModel;
};

const getValues = function () {
    let savedValue = localStorage.getItem(STORAGE_NAMESPACE+'.'+STORAGE_KEY_VALUES);
    return _.isEmpty(savedValue) ? null : savedValue;
};

document.getElementById("autoformat-btn").onclick = () => {
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
};

document.getElementById("create-btn").onclick = () => {
    //etiqueta.create("canvas-area", JSON.parse(modelEditor.getValue()), dadosLongos);
    let modelJson = modelEditor.getValue();
    let valuesObj = _.isEmpty(valueEditor.getValue()) ? dadosDefault : JSON.parse(valueEditor.getValue());
    etiqueta.create("canvas-area-template", JSON.parse(modelJson));
    etiqueta.create("canvas-area", JSON.parse(modelJson), valuesObj);
    save(modelJson, JSON.stringify(valuesObj));
};

document.getElementById("export-btn").onclick = () => {
    let modelJson = modelEditor.getValue();
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const canvasFinal = etiqueta.exportCanvas(canvas.id, JSON.parse(modelJson).impressao.orientacaoEtiquetaGraus);
    const el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    save(modelJson, valueEditor.getValue());
};

document.getElementById("send-btn").onclick = () => {
    let modelJson = modelEditor.getValue();
    const canvas = document.getElementById("canvas-area-etiqueta-canvas") as HTMLCanvasElement;
    const canvasFinal = etiqueta.exportCanvas(canvas.id, JSON.parse(modelJson).impressao.orientacaoEtiquetaGraus);
    const el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    const dataURL = canvasFinal.toDataURL("image/png", 1.0);
    const formData = new FormData();
    formData.append("etiquetaPngBase64", dataURL.replace("data:image/png;base64,", ""));
    const model = JSON.parse(modelEditor.getValue());
    formData.append("opcoesImpressao", JSON.stringify({impressao: model.impressao, etiqueta: model.etiqueta}));
    formData.append("nomeImpressora", "\\\\DESKTOP-UCPGNLU\\Argox OS-214 plus PPLA");
    formData.append("modo", "Argox OS-214");
    formData.append("quantidadeEtiquetas", "5");
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:58080/impressoras/jobs/custom");
    request.send(formData);
    save(modelJson, valueEditor.getValue());
};

document.getElementById("values-btn").onclick = () => {
    document.getElementById("value-wrapper").classList.toggle("close");
    document.getElementById("code-wrapper").classList.toggle("open");
};

document.getElementById("template-btn").onclick = () => {
    document.getElementById("canvas-area-template").classList.toggle("hidden");
};

document.getElementById("help-btn").onclick = () => {
    alert('ATALHOS DO EDITOR\nCtrl-F: pesquisar\nCtrl-G: encontrar o próximo\nShift-Ctrl-G: encontrar o anterior\nShift-Ctrl-F: substituir\nShift-Ctrl-R: substituir todos\nF11: editor em tela-cheia');
};

document.addEventListener("DOMContentLoaded", (event) => {
    let initialModel = getModel() || JSON.stringify(modelDefault);
    let initialValue = getValues() || JSON.stringify(dadosDefault);

    modelEditor.setValue(initialModel);
    valueEditor.setValue(initialValue);
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);

    setTimeout(() => { document.getElementById("create-btn").click(); }, 500);
});

const modelDefault = {
    "impressao": {
        "resolucaoDpi": 203,
        "etiquetasPorPagina": 4,
        "gapXMm": 2,
        "larguraPaginaMm": 106,
        "margemXMm": 0,
        "margemYMm": 0,
        "orientacaoEtiquetaGraus": 90
    },
    "etiqueta": {
        "dimensoes": {
            "alturaMm": 25,
            "larguraMm": 40
        }
    },
    "desenho": {
        "elementos": [{
            "tipo": "qrcode",
            "posicao": {
                "xMm": 25,
                "yMm": 7
            },
            "dimensoes": {
                "larguraMm": 13,
                "alturaMm": 13
            },
            "valor": "{{{urlQrCode}}}"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 25,
                "yMm": 6.5
            },
            "dimensoes": {
                "larguraMaximaMm": 13
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 1.9,
                "negrito": true
            },
            "valor": "BY PARIPASSU"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 4.5
            },
            "dimensoes": {
                "larguraMaximaMm": 35
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 3,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "{{{textoProduto}}}",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 6.5
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 2.2,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "RASTREAMENTO/LOTE",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 9
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 2.8,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "{{{codigoRastreamento}}}",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 12
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 2.0,
                "negrito": true
            },
            "valor": "DATA DE ENTREGA",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 15
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 3.2,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "{{{dataEntrega}}}",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 17.5
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 2.0,
                "negrito": true
            },
            "valor": "DATA DE VALIDADE",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 20
            },
            "dimensoes": {
                "larguraMaximaMm": 22.5
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 3.2,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "{{{dataValidade}}}",
            "fn": "caixaAlta"
        }, {
            "tipo": "texto",
            "posicao": {
                "xMm": 2,
                "yMm": 23
            },
            "dimensoes": {
                "larguraMaximaMm": 35
            },
            "fonte": {
                "nome": "Consolas",
                "alturaMm": 2.2,
                "negrito": true,
                "forcaContorno": 1.5
            },
            "valor": "RASTREIE EM {{{site}}}",
            "fn": "caixaAlta"
        }

        ]
    }
};

const dadosDefault = {
    bairroFornecedor: "bairro do fornecedor",
        codigoFornecedor: "1234",
        codigoRastreamento: "PN7NWCJ0FERB9DH0",
        codigoRastreamentoNumerico: "N22476123456",
        complemento: "complemento complemento",
        complementoFornecedor: "complemento fornecedorRn",
        dataEmbalagem: "26/01/2017",
        dataEntrega: "03/07/2013",
        dataFabricacao: "26/01/2017",
        dataValidade: "04/07/2013",
        documentoFornecedor: "321321321321",
        ean13: "9780201485677",
        localizacaoFornecedor: "localização fornecedor",
        logradouroFornecedor: "logradouro fornecedor logradouro fornecedor logradouro fornecedor",
        nomeEmpresa: "Abacateiros do Sul",
        numeroFornecedor: "320",
        nomeProdutor: "Fazenda Rei do Gado",
        site: "paripassu.com.br",
        telefone: "48 99889988",
        textoProduto: "Pimentão Misto",
        urlQrCode: "http://pqr.io?c=PNBJ20AIR1IR1ABT&p=152&u=kg&k=1",
        precoVarejo: "12,96",
        unidadeEmbalagem: "un",
        nomeDocumentoMeuCadastro: "cnpj",
        documentoMeuCadastro: "78.425.986/0036-15",
        inscricaoRuralMeuCadastro: "12345678",
        nomeDocumentoProdutor: "cnpj",
        documentoProdutor: "78.425.986/0036-16",
        inscricaoRuralProdutor: "87654321",
        logradouroNumeroBairroMeuCadastro: "Servidão caminho da cruz, 240, Monte Verde",
        codigoPostalMeuCadastro: "88032-650",
        cidadeUFMeuCadastro: "Florianópolis-SC",
        nomeFornecedor: "Abacateiros de Jaragua do sul do estado de Santa Catarina - Brasil",
        logradouroNumeroBairroFornecedor: "Servidão Sérgio Machado, 240, Vale do Carangola",
        logradouroNumeroBairroProdutor: "Servidão Sérgio Machado, 240, Vale do Carangola",
        codigoPostalFornecedor: "25715-416",
        cidadeUFFornecedor: "Petrópolis-RJ",
        dataConsolidacao: "13/03/2017",
        nomeMeuCadastro: "FRUTAS CANTU NORDESTE",
        labelAbreviadaCapacidade: "Peso Líq.",
        capacidadeEmbalagem: "0,999",
        capacidadeUnidadeEmbalagem: "0,999g",
        ingredientes: "Pimentão misto",
        valorEnergeticoQtPorcao: "2",
        valorEnergeticoValDiario: "3",
        sodioQtPorcao: "4",
        sodioValDiario: "5",
        proteinasQtPorcao: "6",
        proteinasValDiario: "7",
        gordurasTotaisQtPorcao: "8",
        gordurasTotaisValDiario: "9",
        gorduraTransValDiario: "**",
        fibraAlimentarQtPorcao: "11",
        fibraAlimentarValDiario: "22",
        carboidratosQtPorcao: "33",
        carboidratosValDiario: "44",
        porcao: "Caixa 3kg",
        valorProporcaoCalorias: "999 kcal = 4180kj",
        paisMunicipioMeuCadastro: "São Paulo - SP",
        paisMunicipioProdutor: "Florianópolis - SC",
        variedade: "caturra",
        calibre: "52",
        categoria: "Não sei",
        infoConservacao: "Manter em local seco e arejado, a 15ºC",
        pesoLiquido: "1,99 KG",
};

const dadosLongos = {
    bairroFornecedor: "bairro do fornecedor bairro do fornecedor bairro do fornecedor",
    codigoFornecedor: "1234567891011121314151614",
    codigoRastreamento: "PN7NWCJ0FERB9DH0",
    codigoRastreamentoNumerico: "N22476123456",
    complemento: "complemento complemento complemento",
    complementoFornecedor: "complemento fornecedorRn",
    dataEmbalagem: "26/01/2017",
    dataEntrega: "03/07/2013",
    dataFabricacao: "26/01/2017",
    dataValidade: "04/07/2013",
    documentoFornecedor: "321321321321",
    ean13: "9780201485677",
    localizacaoFornecedor: "localização fornecedor localização fornecedor localização fornecedor",
    logradouroFornecedor: "logradouro fornecedor logradouro fornecedor logradouro fornecedor",
    nomeEmpresa: "Abacateiros do Sul Abacateiros do Sul Abacateiros do Sul Abacateiros do Sul",
    numeroFornecedor: "320",
    nomeProdutor: "Fazenda Rei do Gado Fazenda Rei do Gado Fazenda Rei do Gado Fazenda Rei do Gado",
    site: "paripassu.com.br",
    telefone: "48 99889988",
    textoProduto: "Pimentão Misto Pimentão Misto Pimentão Misto Pimentão Misto",
    urlQrCode: "http://pqr.io?c=PNBJ20AIR1IR1ABT&p=152&u=kg&k=1",
    precoVarejo: "12,96",
    unidadeEmbalagem: "un",
    nomeDocumentoMeuCadastro: "cnpj",
    documentoMeuCadastro: "78.425.986/0036-15",
    inscricaoRuralMeuCadastro: "1234567812345678",
    nomeDocumentoProdutor: "cnpj",
    documentoProdutor: "78.425.986/0036-16",
    inscricaoRuralProdutor: "8765432187654321",
    logradouroNumeroBairroMeuCadastro: "Servidão caminho da cruz, 240, Monte Verde Servidão caminho da cruz, 240, Monte Verde",
    codigoPostalMeuCadastro: "88032-650",
    cidadeUFMeuCadastro: "Florianópolis-SC",
    nomeFornecedor: "Abacateiros de Jaragua do sul do estado de Santa Catarina - Brasil",
    logradouroNumeroBairroFornecedor: "Servidão Sérgio Machado, 240, Vale do Carangola Servidão Sérgio Machado, 240, Vale do Carangola",
    logradouroNumeroBairroProdutor: "Servidão Sérgio Machado, 240, Vale do Carangola Servidão Sérgio Machado, 240, Vale do Carangola",
    codigoPostalFornecedor: "25715-416",
    cidadeUFFornecedor: "Petrópolis-RJ",
    dataConsolidacao: "13/03/2017",
    nomeMeuCadastro: "FRUTAS CANTU NORDESTE FRUTAS CANTU NORDESTE FRUTAS CANTU NORDESTE",
    labelAbreviadaCapacidade: "Peso Líq.",
    capacidadeEmbalagem: "0,999",
    capacidadeUnidadeEmbalagem: "0,999g",
    ingredientes: "Pimentão misto Pimentão misto Pimentão misto Pimentão misto Pimentão misto",
    valorEnergeticoQtPorcao: "2",
    valorEnergeticoValDiario: "3",
    sodioQtPorcao: "4",
    sodioValDiario: "5",
    proteinasQtPorcao: "6",
    proteinasValDiario: "7",
    gordurasTotaisQtPorcao: "8",
    gordurasTotaisValDiario: "9",
    gorduraTransValDiario: "**",
    fibraAlimentarQtPorcao: "11",
    fibraAlimentarValDiario: "22",
    carboidratosQtPorcao: "33",
    carboidratosValDiario: "44",
    porcao: "Caixa 3kg",
    valorProporcaoCalorias: "999 kcal = 4180kj",
    paisMunicipioMeuCadastro: "São Paulo, SP, Brasil São Paulo, SP, Brasil São Paulo, SP, Brasil",
    paisMunicipioProdutor: "Florianópolis, SC, Brasil São Paulo, SP, Brasil São Paulo, SP, Brasil",
    variedade: "caturra caturra caturra caturra caturra",
    calibre: "528784848748848484884848484846446156846464646484644",
    categoria: "Não sei Não sei Não sei Não sei Não sei Não sei Não sei",
    infoConservacao: "Manter em local seco e arejado, a 15ºC, longe da luz do sol. Consumir em até 3 dias após aberto.",
    pesoLiquido: "1,99 KG",
};