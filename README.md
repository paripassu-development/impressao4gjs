## Requisitos

Certifique-se de ter as seguintes versões instaladas:

* **Node.js**: v16.14.0
* **TypeScript**: v2.9.2 (instalado globalmente)
* **Yarn**: v1.22.19

## Instalações:
* [Donwload NVM](https://github.com/coreybutler/nvm-windows/releases)
* Para instalar e usar a versão correta do Node.js:
```bash
    nvm install 16.14.0
    nvm use 16.14.0
```

* Instale o Yarn globalmente usando o npm:
```bash
    npm install -g yarn@1.22.19
```

* Instale o TypeScript globalmente:
```markdown
    yarn global add typescript@2.9.2
    ou
    npm i -g  typescript@2.9.2
```

## Executando o Projeto

* Instale as dependências e inicie o projeto:
```markdown
    yarn install
    yarn start
```

* Após execução do projeto abrir: [webpack-dev-server](http://localhost:8086/webpack-dev-server/)


## Dicas ##
* Ao gerar novas labels ao impressão4g, rodar o comando: 
* Se estiver no Windows
  * Abra o terminal do git bash
  * Acessar o diretório do projeto
  * Execute o comando abaixo
```markdown
    tsc www/label/*.ts --sourceMap
 ```
