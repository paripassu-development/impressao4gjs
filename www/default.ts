
export const dadosDefault = {
    bairroFornecedor: "bairro do fornecedor",
    calibre: "52",
    campoPesoLiquidoNutricional: "10 kg",
    carboidratosQtPorcao: "33",
    carboidratosValDiario: "44",
    categoria: "Não sei",
    cidadeUFFornecedor: "Petrópolis-RJ",
    cidadeUFMeuCadastro: "Florianópolis-SC",
    cidadeUFProdutor: "Florianópolis-SC",
    cliente: "Varejo 1",
    codigoEOrigem: "0012340089",
    codigoFornecedor: "1234",
    codigoPostalFornecedor: "25715-416",
    codigoPostalMeuCadastro: "88032-650",
    codigoRastreamento: "PN7NWCJ0FERB9DH0",
    codigoRastreamentoNumerico: "N22476123456",
    complemento: "complemento complemento",
    complementoFornecedor: "complemento fornecedorRn",
    cultivar: "valor cultivar",
    dataEmbalagem: "26/01/2017",
    dataEntrega: "03/07/2013",
    dataFabricacao: "26/01/2017",
    dataProducao: "25/01/2017",
    dataValidade: "04/07/2013",
    documentoDestino: "571.331.716-19",
    documentoMeuCadastro: "78.425.986/0036-15",
    documentoProdutor: "78.425.986/0036-16",
    ean13: "9780201485677",
    ean13Nutricional: "129123456",
    fibraAlimentarQtPorcao: "11",
    fibraAlimentarValDiario: "22",
    gorduraSaturadaQtPorcao: "0",
    gorduraSaturadaValDiario: "0",
    gordurasTotaisQtPorcao: "8",
    gordurasTotaisValDiario: "9",
    gorduraTransQtPorcao: "0",
    gorduraTransValDiario: "**",
    gtin: "11111111111113",
    infoConsumo: "Consumir em até 3 dias após aberto",
    infoRefrigeracaoConservacao: "Conservar em local seco",
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
    lote: "123",
    nomeDestino: "João Machado",
    nomeDocumentoDestino: "cpf",
    nomeDocumentoMeuCadastro: "cnpj",
    nomeDocumentoProdutor: "cnpj",
    nomeEmbalagem: "Caixa",
    nomeEmpresa: "Abacateiros do Sul",
    nomeFornecedor: "Abacateiros de Jaragua do sul do estado de Santa Catarina - Brasil",
    nomeMeuCadastro: "FRUTAS CANTU NORDESTE",
    nomeProdutor: "Fazenda Rei do Gado",
    numeroFornecedor: "320",
    observacao1: "obs 1",
    observacao2: "obs 2",
    paisMunicipioMeuCadastro: "São Paulo - SP",
    paisMunicipioProdutor: "Florianópolis - SC",
    periodoValidadeNutricional: "15",
    pesoLiquido: "Caixa (10 kg)",
    pesoLiquidoAgranel: "10 kg",
    pesoLiquidoAgranelNutricional: "10 kg",
    pesoLiquidoNutricional: "Caixa (10 kg)",
    porcao: "Caixa 3kg",
    precoVarejo: "12,96",
    proteinasQtPorcao: "6",
    proteinasValDiario: "7",
    quantidadeDeCaixas: "5",
    quantidadeEmbalagem: "10",
    sacDestino: "(48) 99999-9999",
    site: "paripassu.com.br",
    sodioQtPorcao: "4",
    sodioValDiario: "5",
    talhoesRastreamento: "Talhao1,Talhao2",
    telefoneMeuCadastro: "(48) 98888-8888",
    textoProduto: "Pimentão Misto",
    textoProporcaoCalorias: "999 kcal = 4180kj",
    tipoCodigoBarras: "ean13",
    unidadeEmbalagem: "un",
    urlQrCode: "http://pqr.io?c=PNBJ20AIR1IR1ABT&p=152&u=kg&k=1",
    valorEnergeticoQtPorcao: "2",
    valorEnergeticoValDiario: "3",
    variedade: "caturra",
    zonaProducao: "norte",
};

export const modelDefault = {
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