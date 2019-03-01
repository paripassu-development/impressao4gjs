import {FONTES} from "../fonts/fonts";

const METADADOS_IMPRESSAO: any[] = [
    {
        nome: "Impressão",
        tipo: "impressao",
        descricao: "Configurações gerais para impressão da etiqueta",
        camposConfiguraveis: [
            {
                nome: "Largura da página",
                descricao: "Largura do rolo de etiquetas onde será impressa as etiquetas",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "larguraPaginaMm",
            },
            {
                nome: "Etiquetas por página",
                descricao: "Quantidade de colunas no rolo de etiquetas",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "etiquetasPorPagina",
            },
            {
                nome: "Espaçamento vertical",
                descricao: "Tamanho do espaçamento vertical entre as colunas do rolo de etiquetas, em milímetros",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "gapXMm",
            },
            {
                nome: "Margem horizontal esquerda",
                descricao: "Tamanho da margem horizontal esquerda da etiqueta, em milímetros",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "margemXMm",
            },
            {
                nome: "Margem vertical superior",
                descricao: "Tamanho da margem vertical superior da etiqueta, em milímetros",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "margemYMm",
            },
            {
                nome: "Resolução da imagem",
                descricao: "Resolução da imagem (203 ou 300, dependendo do modelo da impressora), em DPI",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "resolucaoDpi",
            },
            {
                nome: "Graus de rotação",
                descricao: "Graus de rotação da imagem na etiqueta",
                tipo: "NUMERIC",
                obrigatorio: true,
                campo: "orientacaoEtiquetaGraus",
            },
        ],
    },
];

const METADADOS_ETIQUETA: any[] = [
    {
        nome: "Etiqueta",
        tipo: "etiqueta",
        descricao: "Configurações gerais da etiqueta",
        camposConfiguraveis: [
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Altura da etiqueta",
                        descricao: "Altura da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "alturaMm",
                    },
                    {
                        nome: "Largura da etiqueta",
                        descricao: "Largura da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "larguraMm",
                    },
                ],
            },
        ],
    },
];

const METADADOS_PDF: any[] = [
    {
        nome: "PDF",
        tipo: "pdf",
        descricao: "Configurações gerais do PDF",
        camposConfiguraveis: [
            {
                nome: "Espaçamento interno da página",
                tipo: "NUMERIC",
                obrigatorio: false,
                campo: "pdfPadding",
                descricao: "Espaçamento interno da página no PDF",
            },
            {
                nome: "Espaçamento entre as etiquetas",
                tipo: "NUMERIC",
                obrigatorio: false,
                campo: "etiquetaPadding",
                descricao: "Espaçamento entre as etiquetas no PDF",
            },
            {
                nome: "Borda na etiqueta",
                tipo: "BOOLEANO",
                obrigatorio: false,
                campo: "etiquetaComBorda",
                descricao: "Define se a etiqueta possuirá uma borda preta no PDF",
            },
        ],
    },
];

const METADADOS_ELEMENTOS: any[] = [
    {
        nome: "Barra Origem Rastreada",
        tipo: "barraOrigemRastreada",
        descricao: "Apresenta a barra PRODUTO COM ORIGEM RASTREADA",
        camposConfiguraveis: [
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "posição no eixo x em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "posição no eixo y em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação do código de barras dentro da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Altura",
                        descricao: "Altura em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                    },
                    {
                        nome: "Largura",
                        descricao: "Largura em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                    },
                ],
            },
            {
                nome: "Fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "Nome da fonte",
                        descricao: "Nome da fonte que vai ser usada para o texto do componente, normalmente é usada Consolas. ",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Força do contorno da fonte",
                        descricao: "Reforço do contorno que vai ser aplicado no texto do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "Negrito",
                        descricao: "Aplicar o negrito no texto do componente",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "Valor",
                descricao: "Texto que fica no centro da barra, caso não seja informado será escrito \"Produto com Origem Rastreada\"",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "valor",
            },
        ],
    },
    {
        nome: "Tabela Nutricional",
        tipo: "tabelaNutricional",
        descricao: "Apresenta uma tabela nutricional, completa ou com elementos específicos.",
        camposConfiguraveis: [
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "Posição no eixo x em milímetros do componente",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "Posição no eixo y em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação da tabela nutricional dentro da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Largura máxima",
                        descricao: "Largura máxima em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                    },
                ],
            },
            {
                nome: "Fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "Nome da fonte",
                        descricao: "Nome da fonte que vai ser usada para o texto do componente, normalmente é usada Consolas. ",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura da fonte",
                        descricao: "Altura das letras (afeta também o espaçamento entre as linhas da tabela)",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Força do contorno da fonte",
                        descricao: "Reforço do contorno que vai ser aplicado no texto do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "Negrito",
                        descricao: "Aplicar o negrito no texto do componente",
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
                        nome: "Ocultar linhas",
                        descricao: "Indica se as linhas de marcação da tabela devem ser ocultadas",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "opcoes.ocultarLinhas",
                    },
                ],
            },
            {
                nome: "Informações adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "Texto",
                        descricao: "Texto a ser apresentado no rodapé da tabela nutricional, com informações adicionais",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                    },
                    {
                        nome: "Caracteres por linha",
                        descricao: "Determina a quantidade de caracteres que o texto pode ter",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.caracteresPorLinha",
                    },
                ],
            },
            {
                nome: "Informações nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "Texto superior",
                        descricao: "Texto que fica localizado acima da tabela nutricional",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                    },
                    {
                        nome: "Texto da quantidade por porção",
                        descricao: "Texto da primeira linha da tabela nutricional",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                    },
                    {
                        nome: "Texto do valor diário",
                        descricao: "Texto abreviado do valor diário, localizado na primeira linha da tabela nutricional à esquerda",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                    },
                    {
                        nome: "Porção caseira",
                        descricao: "Porção à qual os parâmetros nutricionais da tabela fazem referência",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                    },
                    {
                        nome: "Proporção de calorias",
                        descricao: "Proporção de calorias em relação aos KJ's",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                    },
                    {
                        nome: "Ocultar parâmetros zerados",
                        descricao: "Ocultar parâmetros que tiverem a quantidade por porção zerada. Abaixo da tabela aparecerá um texto indicando que não existe quantidade significativa do parâmetro.",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                    },
                    {
                        nome: "informacoesNutrientesTabelaNutricional",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        itens: [
                            {
                                nome: "Sódio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Proteínas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Fibra Alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Valor Energético",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras Totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras Saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
        nome: "Tabela nutricional em linha",
        tipo: "tabelaNutricionalEmLinha",
        descricao: "Apresenta informações do cadastro nutricional completa.",
        camposConfiguraveis: [
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "Posição no eixo x em milímetros do componente",
                        tipo: "NUMERIC",
                        categoria: "posicionamento",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "Posição no eixo y em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação do texto com informações nutricionais dentro da etiqueta",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Largura máxima",
                        descricao: "Largura em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                    },
                ],
            },
            {
                nome: "Múltiplas linhas",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "multiplasLinhas",
                itens: [
                    {
                        nome: "Número máximo de linhas",
                        descricao: "Delimita o número máximo de linhas que as informações nutricionais podem ter. " +
                            "Caso não seja informado, não existirá limite de linhas para o campo em questão.",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                    },
                    {
                        nome: "Altura minima da fonte",
                        descricao: "Delimita a altura mínima (em milímetros) que a fonte do campo pode ter. " +
                            "Caso não seja informado, o tamanho mínimo padrão estabelecido de 1,2 mm será usado",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "Alinhamento",
                        descricao: "Se informado, define o alinhamento do texto, as possíveis opções são: " +
                            "'esquerda', 'direita', 'centro' e 'justificado'. " +
                            "Caso não seja informado, por padrão é usado 'esquerda'",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "Esquerda",
                                valor: "left",
                            },
                            {
                                texto: "Direita",
                                valor: "right",
                            },
                            {
                                texto: "Centro",
                                valor: "center",
                            },
                            {
                                texto: "Justificado",
                                valor: "justify",
                            },
                        ],
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                nome: "Fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "Nome",
                        descricao: "Nome da fonte que vai ser usada para texto do componente, normalmente é usada Consolas",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura",
                        descricao: "Altura das letras (afeta também o espaçamento entre as linhas da tabela)",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Força do contorno da fonte",
                        descricao: "Reforço do contorno que vai ser aplicado no texto do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "Negrito",
                        descricao: "Aplicar o negrito no texto do componente",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                nome: "Informações adicionais",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "informacoesAdicionais",
                itens: [
                    {
                        nome: "Texto",
                        descricao: "Texto a ser apresentado no rodapé da tabela nutricional, com informações adicionais. " +
                            "Caso não seja informado, será exibido o valor padrão",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                    },
                ],
            },
            {
                nome: "Informações nutricionais",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "informacoesNutricionais",
                itens: [
                    {
                        nome: "Texto superior",
                        descricao: "Texto que fica localizado acima da tabela nutricional",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                    },
                    {
                        nome: "Texto da quantidade por porção",
                        descricao: "Texto da primeira linha da tabela nutricional",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                    },
                    {
                        nome: "Texto do valor diário",
                        descricao: "Texto abreviado do valor diário, localizado na primeira linha da tabela nutricional à esquerda",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                    },
                    {
                        nome: "Porção caseira",
                        descricao: "Porção à qual os parâmetros nutricionais da tabela fazem referência",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                    },
                    {
                        nome: "Proporção de calorias",
                        descricao: "Proporção de calorias em relação aos KJ's",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                    },
                    {
                        nome: "Ocultar parâmetros zerados",
                        descricao: "Ocultar parâmetros que tiverem a quantidade por porção zerada. Aparecerá um texto indicando que não existe quantidade significativa do parâmetro.",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "informacoesNutricionais.ocultarZerados",
                    },
                    {
                        nome: "informacoesNutrientesTabelaNutricional",
                        tipo: "OBJECT",
                        campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional",
                        obrigatorio: false,
                        itens: [
                            {
                                nome: "Sódio",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.sodio",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Proteínas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.proteinas",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Carboidratos",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.carboidratos",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Fibra Alimentar",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.fibraAlimentar",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Valor Energético",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.valorEnergetico",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras Totais",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gordurasTotais",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras trans",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraTrans",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
                                nome: "Gorduras Saturadas",
                                tipo: "OBJECT",
                                campo: "informacoesNutricionais.informacoesNutrientesTabelaNutricional.gorduraSaturada",
                                obrigatorio: false,
                                itens: [
                                    {
                                        nome: "Nome",
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
                                        nome: "Quantidade por porção",
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
                                        nome: "Valor diário",
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
        nome: "Texto",
        tipo: "texto",
        descricao: "Elemento de texto",
        camposConfiguraveis: [
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "Posição no eixo x em milímetros do texto",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "Posição no eixo y em milímetros do texto",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Alinhamento",
                        descricao: "Alinhamento horizontal do texto pode ser esquerda, direita ou centro",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "Esquerda",
                                valor: "left",
                            },
                            {
                                texto: "Direita",
                                valor: "right",
                            },
                            {
                                texto: "Centro",
                                valor: "center",
                            },
                        ],
                        obrigatorio: false,
                        campo: "posicao.alinhar",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação do texto",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Largura máxima",
                        descricao: "Largura em milímetros do texto",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                    },
                ],
            },
            {
                nome: "Fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "Nome da fonte",
                        descricao: "Nome da fonte que vai ser usada para texto do componente, normalmente é usada Consolas",
                        tipo: "OPTIONS",
                        opcoes: FONTES,
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura da fonte",
                        descricao: "Altura das letras",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Altura mínima",
                        descricao: "Delimita a altura mínima (em milímetros) que a fonte do campo pode ter. caso não seja informado, o tamanho mínimo padrão estabelecido de 1,2 mm será usado",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.alturaMinimaMm",
                    },
                    {
                        nome: "Negrito",
                        descricao: "Aplica negrito no texto",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                    {
                        nome: "Força do contorno da fonte",
                        descricao: "Reforço do contorno que vai ser aplicado no texto",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                ],
            },
            {
                nome: "Múltiplas linhas",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "multiplasLinhas",
                itens: [
                    {
                        nome: "Número máximo de linhas",
                        descricao: "Determina o número máximo de linhas que o texto pode ter",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                    },
                    {
                        nome: "Altura minima da fonte",
                        descricao: "Delimita a altura mínima (em milímetros) que a fonte do campo pode ter. " +
                            "Caso não seja informado, o tamanho mínimo padrão estabelecido de 1,2 mm será usado",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "Alinhamento",
                        descricao: "Alinhamento horizontal do texto, " +
                            "pode ser esquerda, direita ou centro",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "Esquerda",
                                valor: "left",
                            },
                            {
                                texto: "Direita",
                                valor: "right",
                            },
                            {
                                texto: "Centro",
                                valor: "center",
                            },
                        ],
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                nome: "Máximo de linhas",
                descricao: "Indica o número máximo de linhas que o texto pode ocupar",
                tipo: "NUMERIC",
                obrigatorio: false,
                campo: "maxLinhas",
            },
            {
                nome: "Valor",
                descricao: "O valor que deverá ser escrito. Pode ser utilizado variáveis",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
            },
            {
                nome: "Caixa alta",
                descricao: "Determina se o texto deverá ser em caixa alta",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "fn",
            },
        ],
    },
    {
        nome: "QR Code",
        tipo: "qrcode",
        descricao: "Elemento de QR Code",
        camposConfiguraveis: [
            {
                nome: "Valor",
                descricao: "Texto que será utilizado para criar o QR Code",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
            },
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "posição no eixo x em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "posição no eixo y em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Altura do QR Code",
                        descricao: "Altura do QR Code",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                    },
                    {
                        nome: "Largura do QR Code",
                        descricao: "Largura do QR Code",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                    },
                ],
            },
        ],
    },
    {
        nome: "Código de barras",
        tipo: "codigoBarras",
        descricao: "Código de barras",
        camposConfiguraveis: [
            {
                nome: "Posição",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "posicao",
                itens: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "posição no eixo x em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "posição no eixo y em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "Ângulo de rotação do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                nome: "Tipo de código de barras",
                descricao: "Tipo de código de barras a ser impresso. Pode ser utilizada a variável tipoCodigoBarras para obter " +
                    "o tipo selecionado na tela de impressão. Valores disponíveis: ean13 para EAN-13, itf14 para DUN-14, itf para Intercalado 2 de 5 ou gs1128 para GS1-128",
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
                        texto: "Intercalado 2 de 5",
                        valor: "itf",
                    },
                    {
                        texto: "GS1-128",
                        valor: "gs1128",
                    },
                ],
                obrigatorio: true,
                campo: "tipoCodigoBarras",
            },
            {
                nome: "Tipo de código de barras padrão",
                descricao: "O tipo de código de barras que será inicialmente preenchido na tela de impressão (na tela poderá ser alterado pelo usuário)." +
                    "Valores disponíveis: 'ean13' para EAN-13, 'itf14' para DUN-14, 'itf' para Intercalado 2 de 5 ou 'gs1128' para GS1-128",
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
                        texto: "Intercalado 2 de 5",
                        valor: "itf",
                    },
                    {
                        texto: "GS1-128",
                        valor: "gs1128",
                    },
                ],
                obrigatorio: false,
                campo: "tipoCodigoBarrasPadrao",
            },
            {
                nome: "Valor",
                descricao: "Valor contido no código de barras. " +
                    "EAN-13: 13 dígitos, sendo que o 13º é o dígito verificador calculado; " +
                    "DUN-14: 14 dígitos, sendo que o 14º é o dígito verificador calculado; " +
                    "Intercalado 2 de 5: não possui dígito verificador; " +
                    "GS1-128: não utiliza o parâmetro valor",
                tipo: "TEXT",
                obrigatorio: true,
                preRequisito: [
                    {
                        campo: "valor",
                        oposto: true,
                        valor: "gs1128",
                        tipo: "EXISTENCIA",
                    },
                ],
                campo: "valor",
            },
            {
                nome: "Valores",
                descricao: "Lista de valores para cada trecho do código de barras, acompanhados do seu respectivo Identificador de Aplicação (AI). " +
                    "A ordem dos valores no código de barras é a mesma ordem da lista de valores",
                tipo: "LIST",
                listaTipo: [
                    {
                        nome: "Valor",
                        descricao: "Valor contido no código de barras, no trecho definido pelo identificador (AI) específico",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "valor",
                    },
                    {
                        nome: "Identificador",
                        descricao: "Texto com um número identificando o tipo de informação contida no código de barras, " +
                            "sendo um dos Identificadores de Aplicação (AI)",
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
                nome: "Dimensões",
                tipo: "OBJECT",
                obrigatorio: true,
                campo: "dimensoes",
                itens: [
                    {
                        nome: "Altura do código de barras",
                        descricao: "Altura do código de barras",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaCodigoBarrasMm",
                    },
                    {
                        nome: "Largura unitária do código de barras",
                        descricao: "Largura das barras. " +
                            "Obs.: para o tipo GS1-128, esse parâmetro é um fator de largura e não tem uma proporção definida. " +
                            "Usar valores inteiros para evitar que a largura do código de barras varie conforme o conteúdo do mesmo.",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraUnitariaCodigoBarrasMm",
                    },
                ],
            },
            {
                nome: "Mostrar o texto",
                descricao: "Define se o valor legível será apresentado abaixo do código de barras",
                tipo: "BOOLEAN",
                obrigatorio: false,
                campo: "mostraTexto",
            },
            {
                nome: "Fonte",
                tipo: "OBJECT",
                obrigatorio: false,
                campo: "fonte",
                itens: [
                    {
                        nome: "Nome",
                        descricao: "Nome da fonte que vai ser usada para o texto",
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
                        nome: "Altura",
                        descricao: "Altura das letras da fonte",
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
                        nome: "Alinhamento",
                        descricao: "Alinhamento horizontal do texto com relação ao código de barras, " +
                            "pode ser esquerda, direita ou centro",
                        tipo: "OPTIONS",
                        opcoes: [
                            {
                                texto: "Esquerda",
                                valor: "left",
                            },
                            {
                                texto: "Direita",
                                valor: "right",
                            },
                            {
                                texto: "Centro",
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

const getMetadadosImpressao = (): any[] => {
    return METADADOS_IMPRESSAO;
};

const getMetadadosEtiqueta = (): any[] => {
    return METADADOS_ETIQUETA;
};

const getMetadadosPDF = (): any[] => {
    return METADADOS_PDF;
};

export const labelConfiguration = {getMetadadosElementos, getMetadadosImpressao, getMetadadosEtiqueta, getMetadadosPDF};
