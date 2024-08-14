import {FONTES, FONTES_NUTRICIONAL_VERTICAL} from "../fonts/fonts";

export interface IValoresRotacao {
    [index: number]: {texto: string, valor: string};
}

const RESOLUCAO_DPI: any = [
    {
        texto: "203",
        valor: 203,
    },
    {
        texto: "300",
        valor: 300,
    },
];

const VALORES_ROTACAO: IValoresRotacao = [
    {
        texto: "0°",
        valor: "0",
    },
    {
        texto: "90°",
        valor: "90",
    },
    {
        texto: "180°",
        valor: "180",
    },
    {
        texto: "270°",
        valor: "270",
    },
];

const METADADOS_IMPRESSAO: any = {
    nome: "ras.ui.4g.etiqueta.configuracao.impressao",
    tipo: "impressao",
    descricao: "ras.ui.4g.etiqueta.configuracao.impressao.descricao",
    camposConfiguraveis: [
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.largura",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.largura.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "larguraPaginaMm",
            padrao: 106,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.etiqueta_pagina",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.etiqueta_pagina.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "etiquetasPorPagina",
            padrao: 2,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.espaco_vertical",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.espaco_vertical.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "gapXMm",
            padrao: 0,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.margem_horizontal_esquerda",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.margem_horizontal_esquerda.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "margemXMm",
            padrao: 0,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.margem_vertical_superior",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.margem_vertical_superior.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "margemYMm",
            padrao: 0,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.resolucao_imagem",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.resolucao_imagem.descricao",
            tipo: "OPTIONS",
            opcoes: RESOLUCAO_DPI,
            obrigatorio: true,
            campo: "resolucaoDpi",
            padrao: 203,
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.impressao.graus_rotacao",
            descricao: "ras.ui.4g.etiqueta.configuracao.impressao.graus_rotacao.descricao",
            tipo: "NUMERIC",
            obrigatorio: true,
            campo: "orientacaoEtiquetaGraus",
            padrao: 90,
        },
    ],
};

const METADADOS_ETIQUETA: any = {
    nome: "ras.ui.4g.etiqueta.configuracao.etiqueta",
    tipo: "etiqueta",
    descricao: "ras.ui.4g.etiqueta.configuracao.etiqueta.descricao",
    camposConfiguraveis: [
        {
            nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
            tipo: "OBJECT",
            obrigatorio: true,
            campo: "dimensoes",
            itens: [
                {
                    nome: "ras.ui.4g.etiqueta.configuracao.etiqueta.altura",
                    descricao: "ras.ui.4g.etiqueta.configuracao.etiqueta.altura.descricao",
                    tipo: "NUMERIC",
                    obrigatorio: true,
                    campo: "dimensoes.alturaMm",
                    padrao: 50,
                },
                {
                    nome: "ras.ui.4g.etiqueta.configuracao.etiqueta.largura",
                    descricao: "ras.ui.4g.etiqueta.configuracao.etiqueta.largura",
                    tipo: "NUMERIC",
                    obrigatorio: true,
                    campo: "dimensoes.larguraMm",
                    padrao: 120,
                },
            ],
        },
    ],
};

const METADADOS_PDF: any = {
    nome: "ras.ui.4g.etiqueta.configuracao.pdf",
    tipo: "pdf",
    descricao: "ras.ui.4g.etiqueta.configuracao.pdf.descricao",
    camposConfiguraveis: [
        {
            nome: "ras.ui.4g.etiqueta.configuracao.pdf.espaco_interno",
            tipo: "NUMERIC",
            obrigatorio: false,
            campo: "pdfPadding",
            descricao: "ras.ui.4g.etiqueta.configuracao.pdf.espaco_interno.descricao",
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.pdf.espaco_entre_etiqueta",
            tipo: "NUMERIC",
            obrigatorio: false,
            campo: "etiquetaPadding",
            descricao: "ras.ui.4g.etiqueta.configuracao.pdf.espaco_entre_etiqueta.descricao",
        },
        {
            nome: "ras.ui.4g.etiqueta.configuracao.pdf.borda_etiqueta",
            tipo: "BOOLEANO",
            obrigatorio: false,
            campo: "etiquetaComBorda",
            descricao: "ras.ui.4g.etiqueta.configuracao.pdf.borda_etiqueta.descricao",
        },
    ],
};

/* TODO - Remover de METADADOS_ELEMENTOS as -> tabelaNutricional, tabelaNutricionalV2, tabelaNutricionalEmLinha após
    completa adequação dos clientes com as novas nutricionais verticais */

const METADADOS_ELEMENTOS: any[] = [
    {
        nome: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada",
        tipo: "barraOrigemRastreada",
        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 3,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        padrao: 0,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.altura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                        padrao: 3,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.largura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                        padrao: 114,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.negrito_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.negrito_fonte.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.texto",
                descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.texto.descricao",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "valor",
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional",
        tipo: "tabelaNutricional",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 43,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 1.6,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                        padrao: 0.8,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.negrito_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.negrito_fonte.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "Opções",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "opcoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_linhas",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_linhas.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "opcoes.ocultarLinhas",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "NÃO CONTÉM QUANTIDADES SIGNIFICATIVAS DE GORDURA TOTAIS, GORDURA SATURADAS E GORDURAS TRANS. * % VALORES DIÁRIOS COM BASE EM UMA DIETA DE 2000KCAL OU 8400KJ.  SEUS VALORES PODEM SER MAIORES OU MENORES DEPENDENDO DE SUAS NECESSIDADES ENERGÉTICAS. ** VD NÃO ESTABELECIDO.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                        padrao: 70,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                        padrao: "INFORMAÇÃO NUTRICIONAL",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                        padrao: "QUANTIDADE POR PORÇÃO",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                        padrao: "%VD(*)",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                        padrao: "{{{porcao}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                        padrao: "{{{textoProporcaoCalorias}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                                oposto: true,
                            },
                        ],
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2",
        tipo: "tabelaNutricionalV2",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 43,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 1.6,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                        padrao: 0.8,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.negrito_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.negrito_fonte.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.opcoes",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "opcoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_linhas",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_linhas.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "opcoes.ocultarLinhas",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "* Percentual de valores diários fornecidos pela porção.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                        padrao: 70,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                        padrao: "INFORMAÇÃO NUTRICIONAL",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                        padrao: "{{{porcaoNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadeEmbalagem",
                        padrao: "{{{porcoesPorEmbalagem}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQt100",
                        padrao: "100g",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                        padrao: "%VD*",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                        padrao: "{{{medidaCaseiraNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                        padrao: "{{{textoProporcaoCalorias}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                                oposto: true,
                            },
                        ],
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_adicionados",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_vertical",
        tipo: "tabelaNutricionalVertical",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 64.69,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES_NUTRICIONAL_VERTICAL,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "arial",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 2.82,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                        padrao: 1,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.percentual",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_vertical.texto.rodape.percentual.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "*Percentual de valores diários fornecidos pela porção.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.textoAlimentoProntoParaConsumo",
                        padrao: "**No alimento pronto para consumo.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                        padrao: 70,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                        padrao: "INFORMAÇÃO NUTRICIONAL",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                        padrao: "{{{porcaoNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadeEmbalagem",
                        padrao: "{{{porcoesPorEmbalagem}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQt100",
                        padrao: "100g",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                        padrao: "%VD*",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                        padrao: "{{{medidaCaseiraNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                        padrao: "{{{textoProporcaoCalorias}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                                oposto: true,
                            },
                        ],
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_adicionados",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_vertical_reduzida",
        tipo: "tabelaNutricionalVerticalReduzida",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 64.69,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES_NUTRICIONAL_VERTICAL,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "arial",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 2.1,
                    },
                    // TODO: ver se vai remover
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                        padrao: 0.8,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.percentual",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_vertical.texto.rodape.percentual.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "*Percentual de valores diários fornecidos pela porção.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.textoAlimentoProntoParaConsumo",
                        padrao: "**No alimento pronto para consumo.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                        padrao: 70,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                        padrao: "INFORMAÇÃO NUTRICIONAL",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                        padrao: "{{{porcaoNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadeEmbalagem",
                        padrao: "{{{porcoesPorEmbalagem}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQt100",
                        padrao: "100g",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                        padrao: "%VD*",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                        padrao: "{{{medidaCaseiraNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                        padrao: "{{{textoProporcaoCalorias}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                                oposto: true,
                            },
                        ],
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_adicionados",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linear",
        tipo: "tabelaNutricionalLinear",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 86.4,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "arial",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 2.1,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                        padrao: 0.8,
                    }
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.percentual",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_vertical.texto.rodape.percentual.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "*Percentual de valores diários fornecidos pela porção.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.rodape.alimento_pronto_para_consumo.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.textoAlimentoProntoParaConsumo",
                        padrao: "**No alimento pronto para consumo.",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                        padrao: 70,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_superior.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                        padrao: "INFORMAÇÃO NUTRICIONAL",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                        padrao: "{{{porcaoNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_quantidade_porcoes_embalagem.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadeEmbalagem",
                        padrao: "{{{porcoesPorEmbalagem}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQt100",
                        padrao: "100g",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                        padrao: "%VD*",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                        padrao: "{{{medidaCaseiraNutricionalV2}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                        padrao: "{{{textoProporcaoCalorias}}}",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    }
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.acucares_adicionados",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.acucaresAdicionados",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_v2.texto_superior.100_g.padrao.descricao",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qt100",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha",
        tipo: "tabelaNutricionalEmLinha",
        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 38,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 2.5,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.negrito_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.negrito_fonte.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.multiplas_linhas",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "multiplasLinhas",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.numero_maximo_linhas",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.numero_maximo_linhas.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.altura_minima_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.altura_minima_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alinhamento",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.alinhamento.descricao",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.esquerda",
                                valor: "left",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.direita",
                                valor: "right",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.centro",
                                valor: "center",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.justificado",
                                valor: "justify",
                            },
                        ],
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.texto.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                        padrao: "Texto",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.informacoes_nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                preRequisito: [
                    {
                        campo: "informacoesNutricionais",
                        tipo: "EXISTENCIA",
                    },
                ],
                itens: [
                    {
                        nome: "Parâmetros nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        preRequisito: [
                            {
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                                tipo: "EXISTENCIA",
                            },
                        ],
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.proteinas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.fibra_alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_energetico",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.gorduras_saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                preRequisito: [
                                    {
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                        tipo: "EXISTENCIA",
                                    },
                                ],
                                itens: [
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.nome_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.nome",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.quantidade_porcao_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.qtPorcao",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                    {
                                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.valor_diario_parametro_nutricional",
                                        tipo: "TEXT",
                                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada.valDiario",
                                        obrigatorio: true,
                                        preRequisito: [
                                            {
                                                campo: "informacoesNutricionais.ocultarZerados",
                                                oposto: true,
                                                tipo: "CONFLITO",
                                            },
                                            {
                                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                                tipo: "EXISTENCIA",
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.texto",
        tipo: "texto",
        descricao: "ras.ui.4g.etiqueta.configuracao.texto.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 5,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alinhamento",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.alinhamento.descricao",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.esquerda",
                                valor: "left",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.direita",
                                valor: "right",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.centro",
                                valor: "center",
                            },
                        ],
                        obrigatorio: false,
                        campo: "posicao.alinhar",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.texto",
                descricao: "ras.ui.4g.etiqueta.configuracao.texto.texto.descricao",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
                padrao: "Exemplo de texto",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura_maxima",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                        padrao: 30,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 7,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.altura_minima_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.altura_minima_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.alturaMinimaMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.negrito_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.negrito_fonte.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.multiplas_linhas",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "multiplasLinhas",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.numero_maximo_linhas",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.numero_maximo_linhas.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.texto.altura_minima_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.altura_minima_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alinhamento",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.alinhamento.descricao",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.esquerda",
                                valor: "left",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.direita",
                                valor: "right",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.centro",
                                valor: "center",
                            },
                        ],
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.texto.modificadores",
                descricao: "ras.ui.4g.etiqueta.configuracao.texto.caixa_alta.descricao",
                tipo: "OPTIONS",
                opcoes: [
                    {
                        texto: "ras.ui.4g.etiqueta.configuracao.texto.caixa_alta",
                        valor: "caixaAlta",
                    },
                ],
                obrigatorio: false,
                campo: "fn",
                padrao: "",
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.qrcode",
        tipo: "qrcode",
        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.qrcode.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.altura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                        padrao: 17,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.qrcode.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.largura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                        padrao: 20,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.valor",
                descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.valor.descricao",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
                padrao: "{{{urlQrCode}}}",
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras",
        tipo: "codigoBarras",
        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.rotacao.descricao",
                        campo: "posicao.rotacao",
                        tipo: "OPTIONS",
                        opcoes: VALORES_ROTACAO,
                        obrigatorio: false,
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.tipo_codigo_barras",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.tipo_codigo_barras.descricao",
                tipo: "OPTIONS",
                opcoes: [
                    {
                        texto: "EAN-13",
                        valor: "ean13",
                    },
                    {
                        texto: "DataBar Expanded Stacked",
                        valor: "databarexpandedstacked",
                    },
                    {
                        texto: "DUN-14",
                        valor: "itf14",
                    },
                    {
                        texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.itf",
                        valor: "itf",
                    },
                    {
                        texto: "GS1-128",
                        valor: "gs1128",
                    },
                    {
                        texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.selecionar_impressao",
                        valor: "{{{tipoCodigoBarras}}}",
                    },
                ],
                obrigatorio: true,
                campo: "tipoCodigoBarras",
                padrao: "{{{tipoCodigoBarras}}}",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.tipo_codigo_barras_padrao",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.tipo_codigo_barras_padrao.descricao",
                tipo: "OPTIONS",
                opcoes: [
                    {
                        texto: "EAN-13",
                        valor: "ean13",
                    },
                    {
                        texto: "DUN-14",
                        valor: "itf14",
                    },
                    {
                        texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.itf",
                        valor: "itf",
                    },
                ],
                obrigatorio: false,
                campo: "tipoCodigoBarrasPadrao",
                preRequisito: [
                    {
                        campo: "tipoCodigoBarras",
                        valor: "{{{tipoCodigoBarras}}}",
                        tipo: "EXISTENCIA",
                    },
                ],
                padrao: "ean13",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.valor",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valor.descricao",
                tipo: "TEXT",
                obrigatorio: true,
                preRequisito: [
                    {
                        campo: "tipoCodigoBarras",
                        oposto: true,
                        valores: ["gs1128", "databarexpandedstacked"],
                        tipo: "EXISTENCIA",
                    },
                ],
                campo: "valor",
                padrao: "{{{gtin}}}",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.descricao",
                tipo: "LIST",
                listaTipo: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.descricao",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                valor: "01",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.gtin",
                            },
                            {
                                valor: "02",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.conteudo",
                            },
                            {
                                valor: "10",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.codigo_lote",
                            },
                            {
                                valor: "11",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.data_producao",
                            },
                            {
                                valor: "12",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.data_vencimento_fatura",
                            },
                            {
                                valor: "13",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.data_embalamento",
                            },
                            {
                                valor: "15",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.data_minima_validade",
                            },
                            {
                                valor: "17",
                                texto: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.data_maxima_validade",
                            },
                        ],
                        obrigatorio: true,
                        campo: "identificador",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.valor",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.valor.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "valor",
                    },
                ],
                obrigatorio: true,
                campo: "valores",
                preRequisito: [
                    {
                        campo: "tipoCodigoBarras",
                        valores: ["gs1128", "databarexpandedstacked"],
                        tipo: "EXISTENCIA",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.dimensoes",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.altura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaCodigoBarrasMm",
                        padrao: 6,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.largura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraUnitariaCodigoBarrasMm",
                        padrao: 0.35,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.numero_segmentos_por_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.numero_segmentos_por_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.numeroSegmentosPorLinha",
                        padrao: 10,
                        preRequisito: [
                            {
                                campo: "tipoCodigoBarras",
                                valores: ["databarexpandedstacked"],
                                tipo: "EXISTENCIA",
                            },
                        ],
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.mostra_texto",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.mostra_texto.descricao",
                tipo: "BOOLEAN",
                obrigatorio: false,
                campo: "mostraTexto",
                padrao: true,
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.nome_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.nome_fonte.descricao",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                        padrao: "consolas",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        padrao: 5,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alinhamento",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.alinhamento.descricao",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.esquerda",
                                valor: "left",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.direita",
                                valor: "right",
                            },
                            {
                                texto: "ras.ui.4g.etiqueta.configuracao.centro",
                                valor: "center",
                            },
                        ],
                        obrigatorio: false,
                        campo: "fonte.alinhar",
                    },
                ],
            },
        ],
    },
    {
        nome: "ras.ui.4g.etiqueta.configuracao.alto_teor",
        tipo: "altoTeor",
        descricao: "ras.ui.4g.etiqueta.configuracao.alto_teor.descricao",
        camposConfiguraveis: [
            {
                nome: "ras.ui.4g.etiqueta.configuracao.posicao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "posicao",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_horizontal",
                        descricao: "ras.ui.4g.etiqueta.configuracao.alto_teor.posicao_horizontal.descricao",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                        padrao: 0,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.alto_teor.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                        padrao: 2,
                    }
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alto_teor.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.alto_teor.altura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                        padrao: 30,
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.alto_teor.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.alto_teor.largura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                        padrao: 30,
                    },
                ],
            },
        ],
    },
];

const getMetadadosElementos = (): any[] => {
    return METADADOS_ELEMENTOS;
};

const getMetadadosImpressao = (): any => {
    return METADADOS_IMPRESSAO;
};

const getMetadadosEtiqueta = (): any => {
    return METADADOS_ETIQUETA;
};

const getMetadadosPDF = (): any => {
    return METADADOS_PDF;
};

export const labelConfiguration = {getMetadadosElementos, getMetadadosImpressao, getMetadadosEtiqueta, getMetadadosPDF};
