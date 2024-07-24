async function processImages() {
    const files = document.getElementById('imageUpload').files;
    if (files.length === 0) {
        alert('Por favor, selecione uma ou mais imagens.');
        return;
    }

    document.getElementById('loadingMessage').style.display = 'block';

    const promises = [];
    const batchSize = 10;  // Defina o tamanho do lote para processamento

    for (let i = 0; i < files.length; i += batchSize) {
        const batch = Array.from(files).slice(i, i + batchSize);

        const batchPromises = batch.map(async (file) => {
            const imageUrl = URL.createObjectURL(file);
            const result = await Tesseract.recognize(imageUrl, 'eng', {
                logger: m => console.log(m)
            });
            const text = result.data.text;
            const cardNumber = extractCardNumber(text);
            const balance = extractBalance(text);
            return [file.name, cardNumber, balance];
        });

        promises.push(...batchPromises);

        // Aguarde até que todas as promessas do lote atual sejam resolvidas
        await Promise.all(batchPromises);
    }

    const textData = await Promise.all(promises);

    generateExcel(textData);
    document.getElementById('downloadButton').style.display = 'inline-block';
    document.getElementById('loadingMessage').style.display = 'none';
}

document.getElementById('processButton').addEventListener('click', processImages);

function extractCardNumber(text) {
    const cardPattern = /\b\d{9,10}\b/;
    const match = text.match(cardPattern);
    if (match) {
        let cardNumber = match[0];
        if (cardNumber.length < 10) {
            cardNumber = cardNumber.padStart(10, '0');
        }
        return cardNumber;
    }
    return '';
}

function extractBalance(text) {
    const balancePattern = /\b\d+,\d{2}\b/;
    const match = text.match(balancePattern);
    return match ? match[0] : '';
}

function generateExcel(data) {
    const columnNames = ['Print', 'Cartão', 'Saldo'];
    const ws_data = [columnNames];

    data.forEach(row => {
        ws_data.push(row);
    });

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OCR Data');

    document.getElementById('downloadButton').addEventListener('click', () => {
        XLSX.writeFile(wb, 'output.xlsx');
    });
}
