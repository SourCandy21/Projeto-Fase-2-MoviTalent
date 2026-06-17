# ReViva

Protótipo funcional para concurso: marketplace de reuso, doação, retirada e destinação consciente de itens parados.

## O que o protótipo demonstra

- Cadastro de usuário com perfil de pessoa física, empresa ou projeto social.
- Publicação de anúncios com categoria, volume, estado, prazo, localização, retirada e foto.
- Busca com filtros por texto, categoria, cidade e status.
- Detalhes do item com lances nos três formatos solicitados.
- Encerramento simulado do prazo com definição de vencedor.
- Alertas por e-mail, categoria, cidade e raio.
- Painel com perfil, anúncios publicados e resultados simulados.
- Logo próprio em SVG para uso no projeto.

## Arquitetura

```text
reviva/
  index.html
  package.json
  README.md
  ROTEIRO-VIDEO.md
  server.js
  assets/
    css/
      main.css
    img/
      reviva-logo.svg
    js/
      app.js
      data.js
      store.js
      ui.js
```

## Responsabilidade dos arquivos

- `index.html`: estrutura das telas, modais e formulários.
- `package.json`: scripts para rodar e checar o projeto.
- `server.js`: servidor local simples para abrir o protótipo com JavaScript modular.
- `ROTEIRO-VIDEO.md`: roteiro sugerido para a apresentação de até 5 minutos.
- `assets/css/main.css`: identidade visual, layout responsivo e componentes.
- `assets/img/reviva-logo.svg`: logo vetorial da ReViva.
- `assets/js/data.js`: categorias, cidades e itens fictícios.
- `assets/js/store.js`: estado da aplicação e regras de negócio.
- `assets/js/ui.js`: renderização dos cards, modais, alertas e painel.
- `assets/js/app.js`: eventos dos formulários, botões e inicialização.

## Como rodar na sua máquina

Como o projeto usa JavaScript modular, abra com um servidor local. Com Node instalado, entre na pasta do projeto e rode:

```bash
npm start
```

Depois acesse:

```text
http://127.0.0.1:8080
```

Para checar a sintaxe dos arquivos JavaScript:

```bash
npm run check
```

## Como subir para o GitHub

1. Crie um repositório vazio no GitHub, por exemplo `reviva`.
2. No terminal, entre na pasta do projeto.
3. Rode os comandos abaixo, trocando `SEU-USUARIO` pelo seu usuário do GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/reviva.git
git push -u origin main
```

## Como publicar no GitHub Pages

Depois do push:

1. Abra o repositório no GitHub.
2. Entre em `Settings`.
3. Clique em `Pages`.
4. Em `Build and deployment`, escolha `Deploy from a branch`.
5. Em `Branch`, selecione `main` e a pasta `/root`.
6. Salve e aguarde o GitHub gerar o link público.

## Roteiro sugerido para o vídeo

Use o arquivo `ROTEIRO-VIDEO.md`.
