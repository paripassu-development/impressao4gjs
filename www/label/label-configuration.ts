import {FONTES} from "../fonts/fonts";

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
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.etiqueta_pagina",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.etiqueta_pagina.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "etiquetasPorPagina",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.espaco_vertical",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.espaco_vertical.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "gapXMm",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.margem_horizontal_esquerda",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.margem_horizontal_esquerda.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "margemXMm",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.margem_vertical_superior",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.margem_vertical_superior.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "margemYMm",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.resolucao_imagem",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.resolucao_imagem.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "resolucaoDpi",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.impressao.graus_rotacao",
                descricao: "ras.ui.4g.etiqueta.configuracao.impressao.graus_rotacao.descricao",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "orientacaoEtiquetaGraus",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.etiqueta.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.etiqueta.largura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.rotacao.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.barra_origem_rastreada.largura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.forca_contorno_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.forca_contorno_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.caracter_linha.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_quantidade_porcao.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_valor_diario",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_valor_diario.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.porcao_caseira.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.texto_proporcao_calorias.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.ocultar_parametros_zerados.descricao",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.parametros_nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.rotacao.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional_linha.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
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
                        nome: "Parâmetros nutricionais",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        itens: [
                            {
                                nome: "ras.ui.4g.etiqueta.configuracao.tabela_nutricional.sodio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
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
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.rotacao.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.largura_maxima.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura_fonte",
                        descricao: "ras.ui.4g.etiqueta.configuracao.texto.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
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
                nome: "ras.ui.4g.etiqueta.configuracao.numero_maximo_linhas",
                descricao: "ras.ui.4g.etiqueta.configuracao.texto.numero_maximo_linhas.descricao",
                tipo: "NUMERIC",
                obrigatorio: false,
                campo: "maxLinhas",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.texto",
                descricao: "ras.ui.4g.etiqueta.configuracao.texto.texto.descricao",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
            },
            {
                nome: "Caixa alta",
                descricao: "ras.ui.4g.etiqueta.configuracao.texto.caixa_alta.descricao",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "fn",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.rotacao.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.qrcode.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.largura",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.valor",
                descricao: "ras.ui.4g.etiqueta.configuracao.qrcode.valor.descricao",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.posicao_vertical",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.posicao_vertical.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.rotacao",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.rotacao.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
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
                    {
                        texto: "GS1-128",
                        valor: "gs1128",
                    },
                ],
                obrigatorio: false,
                campo: "tipoCodigoBarrasPadrao",
                preRequisito: [
                    {
                        campo: "tipoCodigoBarras",
                        valor: "{{{tipoCodigoBarras}}}",
                    },
                ],
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
                        valor: "gs1128",
                        tipo: "EXISTENCIA",
                    },
                ],
                campo: "valor",
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.descricao",
                tipo: "LIST",
                listaTipo: [
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.valor",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.valor.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "valor",
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.valores.identificador.descricao",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "identificador",
                    },
                ],
                obrigatorio: false,
                campo: "valores",
                preRequisito: [
                    {
                        campo: "valor",
                        valor: "gs1128",
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
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.largura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.largura.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraUnitariaCodigoBarrasMm",
                    },
                ],
            },
            {
                nome: "ras.ui.4g.etiqueta.configuracao.codigo_barras.mostra_texto",
                descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.mostra_texto.descricao",
                tipo: "BOOLEAN",
                obrigatorio: false,
                campo: "mostraTexto",
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
                        preRequisito: [
                            {
                                campo: "mostraTexto",
                                valor: true,
                                tipo: "EXISTENCIA",
                            },
                        ],
                    },
                    {
                        nome: "ras.ui.4g.etiqueta.configuracao.altura",
                        descricao: "ras.ui.4g.etiqueta.configuracao.codigo_barras.altura_fonte.descricao",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                        preRequisito: [
                            {
                                campo: "mostraTexto",
                                valor: true,
                                tipo: "EXISTENCIA",
                            },
                        ],
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
                        preRequisito: [
                            {
                                campo: "mostraTexto",
                                valor: true,
                                tipo: "EXISTENCIA",
                            },
                        ],
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
