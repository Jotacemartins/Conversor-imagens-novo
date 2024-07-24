# OCR e Geração de Excel

Este projeto realiza OCR (Reconhecimento Óptico de Caracteres) em imagens carregadas pelo usuário, extrai números de cartão de 10 dígitos e saldos no formato `xx,xx`, e gera um arquivo Excel com os dados extraídos.

## Funcionalidades

- Carregar imagens para processamento.
- Reconhecer texto nas imagens usando Tesseract.js.
- Extrair números de cartão de 10 dígitos e saldos.
- Gerar um arquivo Excel com os dados extraídos.

## Como Usar

1. Clone este repositório em seu ambiente local.
2. Abra o arquivo `index.html` em um navegador web.
3. Carregue uma ou mais imagens clicando no botão de upload.
4. Clique no botão "Processar Imagens" para iniciar o processamento.
5. Após o processamento, clique no botão "Download" para baixar o arquivo Excel gerado.

## Estrutura do Projeto

- `index.html`: Contém a estrutura HTML da página.
- `script.js`: Contém o código JavaScript para processar as imagens, extrair os dados e gerar o arquivo Excel.
- `styles.css`: Contém os estilos CSS para a página.

## Dependências

- [Tesseract.js](https://github.com/naptha/tesseract.js): Biblioteca JavaScript para realizar OCR.
- [SheetJS (XLSX.js)](https://github.com/SheetJS/sheetjs): Biblioteca JavaScript para criar e manipular arquivos Excel.

## Código JavaScript

### `processImages`

Esta função é responsável por:

- Obter os arquivos de imagem selecionados pelo usuário.
- Exibir a mensagem de carregamento.
- Usar o Tesseract para reconhecer o texto nas imagens.
- Extrair números de cartão e saldos do texto reconhecido.
- Gerar o arquivo Excel com os dados extraídos.
- Exibir o botão de download e ocultar a mensagem de carregamento.

### `extractCardNumber`

Esta função extrai o número do cartão (10 dígitos) do texto reconhecido.

### `extractBalance`

Esta função extrai o saldo (formato `xx,xx`) do texto reconhecido.

### `generateExcel`

Esta função gera o arquivo Excel com os dados extraídos e prepara o botão de download.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
