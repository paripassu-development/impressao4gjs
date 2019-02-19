const METADADOS_ETIQUETA = [
    {
        nome: "barraOrigemRastreada",
        descricao: "Apresenta a barra PRODUTO COM ORIGEM RASTREADA.",
        camposConfiguraveis: [
            {
                nome: "Tipo",
                descricao: "Identifica o tipo do componente, neste caso barraOrigemRastreada",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipo",
            },
            {
                posicao: [
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
                nome: "Tipo codigo de barras ",
                descricao: "tipo de código de barras a ser impresso. Pode ser utilizada a variável tipoCodigoBarras para obter " +
                    "o tipo selecionado na tela de impressão (na tela há apenas as opções EAN13, DUN14 e Intercalado 2 de 5)." +
                    "Valores disponíveis: ean13 para EAN-13, itf14 para DUN-14, itf para Intercalado 2 de 5 ou gs1128 para GS1-128",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipoCodigoBarras",
            },
            {
                nome: "Tipo codigo de barras padrão",
                descricao: "o tipo de código de barras que será inicialmente preenchido na tela de impressão (na tela poderá ser alterado pelo usuário)." +
                    "Valores disponíveis: 'ean13' para EAN-13, 'itf14' para DUN-14, 'itf' para Intercalado 2 de 5 ou 'gs1128' para GS1-128",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipoCodigoBarrasPadrao",
            },
            {
                nome: "Valor",
                descricao: "valor contido no código de barras (também é apresentado abaixo do código de barras, se o parâmetro mostrarTexto for true). " +
                    "EAN-13: 13 dígitos, sendo que o 13º é o dígito verificador calculado; " +
                    "DUN-14: 14 dígitos, sendo que o 14º é o dígito verificador calculado; " +
                    "Intercalado 2 de 5: não possui dígito verificador; " +
                    "GS1-128: não utiliza o parâmetro valor, utiliza o parâmetro valores, descrito abaixo;",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "valor",
            },
            {
                nome: "Valores",
                descricao: "[Apenas para GS1-128] Valores para cada trecho do código de barras, acompanhados do seu respectivo Identificador de Aplicação (AI). " +
                    "A ordem dos valores no código de barras é a mesma ordem da lista de valores. " +
                    "Estrutura definida na seção Valores GS1-128.",
                tipo: "LIST",
                listTipo: [
                    {
                        nome: "Valor",
                        descricao: "Valor contido no código de barras, no trecho definido pelo identificador (AI) específico",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "valor",
                    },
                    {
                        nome: "Identificador",
                        descricao: "texto com um número identificando o tipo de informação contida no código de barras, " +
                            "sendo um dos Identificadores de Aplicação (AI)",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "identificador",
                    },
                ],
                obrigatorio: false,
                campo: "valores",
                preRequisito: {
                    campo: "valor",
                    valor: "GS1-128",
                },
            },
            {
                dimensoes: [
                    {
                        nome: "Altura codigo de barras",
                        descricao: "Altura do código de barras",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaCodigoBarrasMm",
                    },
                    {
                        nome: "Largura unitaria codigo de barras",
                        descricao: "largura das barras. " +
                            "Obs.: para o tipo GS1-128, esse parâmetro é um fator de largura e não tem uma proporção definida. " +
                            "Usar valores inteiros para evitar que a largura do código de barras varie conforme o conteúdo do mesmo.",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraUnitariaCodigoBarrasMm",
                    },
                ],
            },
            {
                nome: "Mostra texto",
                descricao: "define se o valor legível será apresentada abaixo do código de barras",
                tipo: "BOOLEAN",
                obrigatorio: false,
                campo: "mostraTexto",
            },
            {
                fonte: [
                    {
                        nome: "Nome",
                        descricao: "nome da fonte que vai ser usada para o texto (se o parâmetro mostrarTexto for true).",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "fonte.nome",
                        preRequisito: {
                            campo: "mostrarTexto",
                            valor: true,
                        },
                    },
                    {
                        nome: "Altura",
                        descricao: "altura das letras",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Alinhar",
                        descricao: "alinhamento horizontal do texto com relação ao código de barras, " +
                            "pode ser left (esqueda), right (direita) ou center (centro)",
                        tipo: "TEXT",
                        obrigatorio: false,
                        campo: "fonte.alinhar",
                    },
                ],
            },
        ],
    },
    {
        nome: "tabelaNutricional",
        descricao: "Apresenta uma tabela nutricional, completa ou com elementos específicos.",
        camposConfiguraveis: [
            {
                nome: "Tipo",
                descricao: "Identifica o tipo do componente, neste caso tabelaNutricional",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipo",
            },
            {
                posicao: [
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
                dimensoes: [
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
                fonte: [
                    {
                        nome: "Nome fonte",
                        descricao: "nome da fonte que vai ser usada para texto do componente, normalmente é usado Consolas. " +
                            "Para outras possibilidades de fontes clique aqui.",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura fonte",
                        descricao: "altura das letras (afeta também o espaçamento entre as linhas da tabela)",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Forca contorno fonte",
                        descricao: "reforço do contorno que vai ser aplicado no texto do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "Negrito",
                        descricao: "aplicar o negrito no texto do componente",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                opcoes: [
                    {
                        nome: "Ocultar Linhas",
                        descricao: "Indica se as linhas de marcação da tabela devem ser ocultadas",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "opcoes.ocultarLinhas",
                    },
                ],
            },
            {
                informacoesAdicionais: [
                    {
                        nome: "Texto",
                        descricao: "Texto a ser apresentado no rodapé da tabela nutricional, com informações adicionais",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                    },
                ],
            },
            {
                informacoesNutricionais: [
                    {
                        nome: "Informação nutricional",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoInformacaoNutricional",
                    },
                    {
                        nome: "Quantidade por porção",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoQuantidadePorPorcao",
                    },
                    {
                        nome: "Valor diário",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoAbreviadoValorDiario",
                    },
                    {
                        nome: "Porção caseira",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoPorcaoCaseira",
                    },
                    {
                        nome: "Proporção calorias",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesNutricionais.textoProporcaoCalorias",
                    },
                    {
                        nome: "Parametros Padrões",
                        descricao: "",
                        tipo: "LIST",
                        listTipo: [
                            {
                                campo: "rotulo",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                            {
                                campo: "valorDiario",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                            {
                                campo: "qtPorcao",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                            {
                                campo: "unidade",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                            {
                                campo: "existe",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                            {
                                campo: "obrigatorio",
                                obrigatorio: true,
                                tipo: "TEXT",
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        nome: "Tabela nutricional em linha",
        descricao: "Apresenta informações do cadastro nutricional completa.",
        camposConfiguraveis: [
            {
                nome: "Tipo",
                descricao: "identifica o tipo do componente, neste caso tabelaNutricionalEmLinha",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipo",
            },
            {
                posicao: [
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
                dimensoes: [
                    {
                        nome: "Largura máxima",
                        descricao: "largura em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                    },
                ],
            },
            {
                multiplasLinhas: [
                    {
                        nome: "Numero máximo de linhas",
                        descricao: "Delimita o número máximo de linhas que as informações nutricionais podem ter. " +
                            "Caso não seja informado, não existirá limite de linhas para o campo em questão.",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                    },
                    {
                        nome: "Altura minima da fonte",
                        descricao: "Delimita a altura mínima (em milímetros) que a fonte do campo pode ter. " +
                            "Caso não seja informado, o tamanho mínimo padrão estabelecido de 1,2 mm será usado.",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "Alinhamento",
                        descricao: "Se informado, define o alinhamento do texto, as possíveis opções são: " +
                            "'left', 'right', 'center' e 'justify', exatamente como escrito aqui. " +
                            "Caso não seja informado, por padrão é usado 'left'",
                        tipo: "TEXT",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                fonte: [
                    {
                        nome: "Nome",
                        descricao: "nome da fonte que vai ser usada para texto do componente, normalmente é usado Consolas. " +
                            "Para outras possibilidades de fontes clique aqui.",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura",
                        descricao: "altura das letras (afeta também o espaçamento entre as linhas da tabela).",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Forca contorno fonte",
                        descricao: "reforço do contorno que vai ser aplicado no texto do componente",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                    {
                        nome: "Negrito",
                        descricao: "aplicar o negrito no texto do componente",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                ],
            },
            {
                informacoesAdicionais: [
                    {
                        nome: "Texto",
                        descricao: "Texto a ser apresentado no rodapé da tabela nutricional, com informações adicionais. " +
                            "Caso não seja informado, será exibido o valor padrão.",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "informacoesAdicionais.texto",
                    },
                ],
            },
        ],
    },
    {
        nome: "Texto",
        descricao: "",
        camposConfiguraveis: [
            {
                nome: "Tipo",
                descricao: "",
                tipo: "TEXT",
                obrigatorio: true,
                campo: "tipo",
            },
            {
                posicao: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Alinhar",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: false,
                        campo: "posicao.alinhar",
                    },
                    {
                        nome: "Rotação",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                dimensoes: [
                    {
                        nome: "Largura maxima",
                        descricao: "Largura em milímetros do componente",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMaximaMm",
                    },
                ],
            },
            {
                fonte: [
                    {
                        nome: "Nome",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: true,
                        campo: "fonte.nome",
                    },
                    {
                        nome: "Altura",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMm",
                    },
                    {
                        nome: "Altura minima",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "fonte.alturaMinimaMm",
                    },
                    {
                        nome: "Negrito",
                        descricao: "",
                        tipo: "BOOLEAN",
                        obrigatorio: false,
                        campo: "fonte.negrito",
                    },
                    {
                        nome: "Forca contorno fonte",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "fonte.forcaContorno",
                    },
                ],
            },
            {
                multiplasLinhas: [
                    {
                        nome: "Numero máximo de linhas",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.numeroMaximoDeLinhas",
                    },
                    {
                        nome: "Altura minima da fonte",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alturaMinimaFonteMm",
                    },
                    {
                        nome: "Alinhamento",
                        descricao: "",
                        tipo: "TEXT",
                        obrigatorio: false,
                        campo: "multiplasLinhas.alinhamento",
                    },
                ],
            },
            {
                nome: "Máximo de linhas",
                descricao: "",
                tipo: "NUMERIC",
                obrigatorio: false,
                campo: "maxLinhas",
            },
            {
                nome: "Valor",
                descricao: "",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "valor",
            },
            {
                nome: "Fn",
                descricao: "",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "fn",
            },
        ],
    },
    {
        nome: "Qr Code",
        descricao: "",
        camposConfiguraveis: [
            {
                nome: "Tipo",
                descricao: "",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "tipo",
            },
            {
                nome: "Valor",
                descricao: "",
                tipo: "TEXT",
                obrigatorio: false,
                campo: "valor",
            },
            {
                posicao: [
                    {
                        nome: "Posicionamento horizontal",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.xMm",
                    },
                    {
                        nome: "Posicionamento vertical",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "posicao.yMm",
                    },
                    {
                        nome: "Rotação",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: false,
                        campo: "posicao.rotacao",
                    },
                ],
            },
            {
                dimensoes: [
                    {
                        nome: "Altura codigo de barras",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.alturaMm",
                    },
                    {
                        nome: "Largura unitaria codigo de barras",
                        descricao: "",
                        tipo: "NUMERIC",
                        obrigatorio: true,
                        campo: "dimensoes.larguraMm",
                    },
                ],
            },
        ],
    },
];
