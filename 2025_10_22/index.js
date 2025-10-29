const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send("Home page")
})

app.get('/json', (req, res) => {
    const data = {
        message: "To jest przykładowy dokument JSON",
        status: "success",
        items: [1, 2, 3, 4]
    };
    res.send(JSON.stringify(data));
})

app.get('/html', (req, res) => {
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
    res.send(htmlData);
})

app.get('/file', (req, res) => {
    const filePath = path.join(__dirname, 'static.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.send('Błąd podczas odczytu pliku HTML');
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.send(data);
        }
    });
})

app.get('/get_params', (req, res) => {
    console.log(req.query);

    const timestamp = Date.now();
    const filename = `params_${timestamp}.json`;

    fs.writeFile(filename, JSON.stringify(req.query, null, 2), (err) => {
        if (err) {
            console.error('Błąd zapisu pliku:', err);
            res.end(JSON.stringify({ error: 'Błąd zapisu pliku' }));
            return;
        }
        res.send(JSON.stringify({ ok: 'ok' }));
    })
});

app.use(express.static('assets'))

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});