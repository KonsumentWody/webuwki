const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    try {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        const pathname = reqUrl.pathname;

        res.setHeader('Content-Type', 'text/plain; charset=utf-8');

        if (pathname === '/') {
            res.end('Strona Główna');

        } else if (pathname === '/json') {
            res.setHeader('Content-Type', 'application/json');
            const data = {
                message: "To jest przykładowy dokument JSON",
                status: "success",
                items: [1, 2, 3, 4]
            };
            res.end(JSON.stringify(data));

        } else if (pathname === '/html') {
            res.setHeader('Content-Type', 'text/html');
            const htmlData = `
        <!DOCTYPE html>
        <html>
          <head><title>HTML z Node.js</title><meta charset="UTF-8"></head>
          <body>
            <h1>To jest HTML wygenerowany w Node.js</h1>
            <p>Ścieżka: /html</p>
          </body>
        </html>
      `;
            res.end(htmlData);

        } else if (pathname === '/file') {
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

        } else if (pathname === '/get_params' && req.method === 'GET') {
            const queryParams = Object.fromEntries(reqUrl.searchParams.entries());
            console.log('Parametry GET:', queryParams);
            const paramsArray = Object.entries(queryParams);

            const timestamp = Date.now();
            const filename = `params_${timestamp}.json`;

            fs.writeFile(filename, JSON.stringify(paramsArray, null, 2), (err) => {
                if (err) {
                    console.error('Błąd zapisu pliku:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Błąd zapisu pliku' }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ ok: 'ok' }));
            });

        } else {
            res.statusCode = 404;
            res.end('Nie znaleziono strony');
        }
    } catch (e) {
        console.error('Błąd przetwarzania żądania:', e);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Błędne żądanie' }));
    }
});

server.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
