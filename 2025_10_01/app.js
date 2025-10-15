const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 4000;
const server = http.createServer((req, res) => {
    const url = req.url;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    if (url==="/"){
        res.end("Strona Główna");
    }
    else if (url==='/json'){
        res.setHeader('Content-Type', 'application/json');
        const data = {
            message: "To jest przykładowy dokument JSON",
            status: "success",
            items: [1, 2, 3, 4]
        };
        res.end(JSON.stringify(data));
    }
    else if(url==='/html'){
        res.setHeader('Content-Type', 'text/html');
        const htmlData='<!DOCTYPE html>\n' +
            '            <html>\n' +
            '            <head><title>HTML z Node.js</title><meta charset="UTF-8"></head>\n' +
            '            <body>\n' +
            '                <h1>To jest HTML wygenerowany w Node.js</h1>\n' +
            '                <p>Ścieżka: /html</p>\n' +
            '            </body>\n' +
            '            </html>'
        res.end(htmlData);
    }
    else if (url === '/file') {
        res.setHeader('Content-Type', 'text/html');
        const filePath = path.join(__dirname, 'static.html');

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Błąd podczas odczytu pliku HTML');
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(data);
            }
        });

    }
    else {
        res.statusCode = 404;
        res.end('Nie znaleziono strony');
    }
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});