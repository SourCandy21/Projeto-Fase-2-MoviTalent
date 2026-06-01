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
outputs/
  index.html
  README.md
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
- `assets/css/main.css`: identidade visual, layout responsivo e componentes.
- `assets/img/reviva-logo.svg`: logo vetorial da ReViva.
- `assets/js/data.js`: categorias, cidades e itens fictícios.
- `assets/js/store.js`: estado da aplicação e regras de negócio.
- `assets/js/ui.js`: renderização dos cards, modais, alertas e painel.
- `assets/js/app.js`: eventos dos formulários, botões e inicialização.

## Como abrir

Como o projeto usa JavaScript modular, abra com um servidor local.

Com Node instalado:

```bash
npx serve .
```

Ou publique direto no GitHub Pages apontando para a pasta do projeto.

## Roteiro sugerido para o vídeo

1. Apresente o problema: itens úteis acabam virando descarte.
2. Mostre a solução ReViva e o logo.
3. Demonstre o cadastro de perfil.
4. Publique um anúncio novo.
5. Busque o anúncio e abra os detalhes.
6. Envie um lance e simule o fim do prazo.
7. Crie um alerta por categoria e cidade.
8. Feche com o impacto: economia, reaproveitamento e destinação correta.
