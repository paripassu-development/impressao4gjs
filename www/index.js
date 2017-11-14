var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
var codeEditor = require("./editor");
require("./fonts/index.css");
require("./index.html");
var index_1 = require("./label/index");
require("./styles.css");
var _ = require('lodash');
var modelEditor = codeEditor.createEditor("code");
var valueEditor = codeEditor.createEditor("values");
var STORAGE_NAMESPACE = "impressao4gjs.etiqueta";
var STORAGE_KEY_MODEL = "lastmodel";
var STORAGE_KEY_VALUES = "lastvalues";
var save = function (model, values) {
    localStorage.setItem(STORAGE_NAMESPACE + '.' + STORAGE_KEY_MODEL, model);
    localStorage.setItem(STORAGE_NAMESPACE + '.' + STORAGE_KEY_VALUES, values);
};
var getModel = function () {
    var savedModel = localStorage.getItem(STORAGE_NAMESPACE + '.' + STORAGE_KEY_MODEL);
    return _.isEmpty(savedModel) ? null : savedModel;
};
var getValues = function () {
    var savedValue = localStorage.getItem(STORAGE_NAMESPACE + '.' + STORAGE_KEY_VALUES);
    return _.isEmpty(savedValue) ? null : savedValue;
};
document.getElementById("autoformat-btn").onclick = function () {
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
};
document.getElementById("create-btn").onclick = function () {
    //etiqueta.create("canvas-area", JSON.parse(modelEditor.getValue()), dadosLongos);
    var modelJson = modelEditor.getValue();
    var valuesObj = _.isEmpty(valueEditor.getValue()) ? dadosDefault : JSON.parse(valueEditor.getValue());
    yield index_1.etiqueta.create("canvas-area-template", JSON.parse(modelJson));
    yield index_1.etiqueta.create("canvas-area", JSON.parse(modelJson), valuesObj);
    save(modelJson, JSON.stringify(valuesObj));
};
document.getElementById("export-btn").onclick = function () {
    var modelJson = modelEditor.getValue();
    var canvas = document.getElementById("canvas-area-etiqueta-canvas");
    var canvasFinal = index_1.etiqueta.exportCanvas(canvas.id, JSON.parse(modelJson).impressao.orientacaoEtiquetaGraus);
    var el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    save(modelJson, valueEditor.getValue());
};
document.getElementById("send-btn").onclick = function () {
    var modelJson = modelEditor.getValue();
    var canvas = document.getElementById("canvas-area-etiqueta-canvas");
    var canvasFinal = index_1.etiqueta.exportCanvas(canvas.id, JSON.parse(modelJson).impressao.orientacaoEtiquetaGraus);
    var el = document.getElementById("canvas-area-final");
    el.appendChild(canvasFinal);
    var dataURL = canvasFinal.toDataURL("image/png", 1.0);
    var formData = new FormData();
    formData.append("etiquetaPngBase64", dataURL.replace("data:image/png;base64,", ""));
    var model = JSON.parse(modelEditor.getValue());
    formData.append("opcoesImpressao", JSON.stringify({ impressao: model.impressao, etiqueta: model.etiqueta }));
    formData.append("nomeImpressora", "\\\\DESKTOP-UCPGNLU\\Argox OS-214 plus PPLA");
    formData.append("modo", "Argox OS-214");
    formData.append("quantidadeEtiquetas", "5");
    var request = new XMLHttpRequest();
    request.open("POST", "http://localhost:58080/impressoras/jobs/custom");
    request.send(formData);
    save(modelJson, valueEditor.getValue());
};
document.getElementById("values-btn").onclick = function () {
    document.getElementById("value-wrapper").classList.toggle("close");
    document.getElementById("code-wrapper").classList.toggle("open");
};
document.getElementById("template-btn").onclick = function () {
    document.getElementById("canvas-area-template").classList.toggle("hidden");
};
document.getElementById("help-btn").onclick = function () {
    alert('ATALHOS DO EDITOR\nCtrl-F: pesquisar\nCtrl-G: encontrar o próximo\nShift-Ctrl-G: encontrar o anterior\nShift-Ctrl-F: substituir\nShift-Ctrl-R: substituir todos\nF11: editor em tela-cheia');
};
document.addEventListener("DOMContentLoaded", function (event) {
    var initialModel = getModel() || JSON.stringify(modelDefault);
    var initialValue = getValues() || JSON.stringify(dadosDefault);
    modelEditor.setValue(initialModel);
    valueEditor.setValue(initialValue);
    codeEditor.autoFormat(modelEditor);
    codeEditor.autoFormat(valueEditor);
    setTimeout(function () {
        document.getElementById("create-btn").click();
    }, 500);
});
var modelDefault = {
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
var dadosDefault = {
    bairroFornecedor: "bairro do fornecedor",
    calibre: "52",
    campoPesoLiquidoNutricional: "valor",
    carboidratosQtPorcao: "33",
    carboidratosValDiario: "44",
    categoria: "Não sei",
    cidadeUFFornecedor: "Petrópolis-RJ",
    cidadeUFMeuCadastro: "Florianópolis-SC",
    cidadeUFProdutor: "valor",
    cliente: "valor",
    codigoFornecedor: "1234",
    codigoPostalFornecedor: "25715-416",
    codigoPostalMeuCadastro: "88032-650",
    codigoRastreamento: "PN7NWCJ0FERB9DH0",
    codigoRastreamentoNumerico: "N22476123456",
    complemento: "complemento complemento",
    complementoFornecedor: "complemento fornecedorRn",
    cultivar: "valor",
    dataEmbalagem: "26/01/2017",
    dataEntrega: "03/07/2013",
    dataFabricacao: "26/01/2017",
    dataProducao: "valor",
    dataValidade: "04/07/2013",
    documentoDestino: "571.331.716-19",
    documentoFornecedor: "321321321321",
    documentoMeuCadastro: "78.425.986/0036-15",
    documentoProdutor: "78.425.986/0036-16",
    ean13: "valor",
    ean13Nutricional: "129123456",
    fibraAlimentarQtPorcao: "11",
    fibraAlimentarValDiario: "22",
    gorduraSaturadaQtPorcao: "0",
    gorduraSaturadaValDiario: "0",
    gordurasTotaisQtPorcao: "8",
    gordurasTotaisValDiario: "9",
    gorduraTransQtPorcao: "0",
    gorduraTransValDiario: "**",
    ingredientes: "Pimentão misto",
    inscricaoRuralMeuCadastro: "12345678",
    inscricaoRuralProdutor: "87654321",
    labelAbreviadaCapacidade: "Peso Líq.",
    localizacaoDestino: "localização destino",
    localizacaoFornecedor: "localização fornecedor",
    logradouroDestino: "logradouro Destino",
    logradouroFornecedor: "logradouro fornecedor logradouro fornecedor logradouro fornecedor",
    logradouroNumeroBairroFornecedor: "Servidão Sérgio Machado, 240, Vale do Carangola",
    logradouroNumeroBairroMeuCadastro: "Servidão caminho da cruz, 240, Monte Verde",
    logradouroNumeroBairroProdutor: "Servidão Sérgio Machado, 240, Vale do Carangola",
    lote: "valor",
    nomeDestino: "João Machado",
    nomeDocumentoDestino: "cpf",
    nomeDocumentoMeuCadastro: "cnpj",
    nomeDocumentoProdutor: "cnpj",
    nomeEmpresa: "Abacateiros do Sul",
    nomeFornecedor: "Abacateiros de Jaragua do sul do estado de Santa Catarina - Brasil",
    nomeMeuCadastro: "FRUTAS CANTU NORDESTE",
    nomeProdutor: "Fazenda Rei do Gado",
    numeroFornecedor: "320",
    observacao1: "valor",
    observacao2: "valor",
    paisMunicipioMeuCadastro: "São Paulo - SP",
    paisMunicipioProdutor: "Florianópolis - SC",
    pesoLiquido: "1,99 KG",
    pesoLiquidoNutricional: "valor",
    porcao: "Caixa 3kg",
    precoVarejo: "12,96",
    proteinasQtPorcao: "6",
    proteinasValDiario: "7",
    quantidadeDeCaixas: "valor",
    sacDestino: "(48) 99999-9999",
    site: "paripassu.com.br",
    sodioQtPorcao: "4",
    sodioValDiario: "5",
    textoProduto: "Pimentão Misto",
    textoProporcaoCalorias: "999 kcal = 4180kj",
    unidadeEmbalagem: "un",
    urlQrCode: "http://pqr.io?c=PNBJ20AIR1IR1ABT&p=152&u=kg&k=1",
    valorEnergeticoQtPorcao: "2",
    valorEnergeticoValDiario: "3",
    variedade: "caturra",
    zonaProducao: "valor",
    infoRefrigeracaoConservacao: "Manter na geladeira 20º",
    infoConsumo: "Comer gelado"
};
var dadosLongos = {
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
    pesoLiquido: "1,99 KG",
    nomeDestino: "João Machado",
    nomeDocumentoDestino: "cpf",
    documentoDestino: "571.331.716-19",
    logradouroDestino: "logradouro",
    localizacaoDestino: "localização destino",
    sacDestino: "(48) 99999-9999"
};
//# sourceMappingURL=index.js.map