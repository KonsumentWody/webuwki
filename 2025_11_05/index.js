const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_app_db'
});


db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych:', err);
        return;
    }
    console.log('Połączono z bazą danych MySQL.');
});


app.use(express.static(path.join(__dirname, 'static')));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/index.html'));
})

app.get('/o-nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/o-nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'static/kontakt.html'));
});

app.post('/kontakt', (req, res) => {
    const { imie, nazwisko, email, wiadomosc } = req.body;
    if (!imie || !nazwisko || !email || !wiadomosc) {
        return res.status(400).send('Brak wymaganych pól.');
    }
    const sql = 'INSERT INTO messages (imie, nazwisko, email, wiadomosc) VALUES (?, ?, ?, ?)';
    db.query(sql, [imie, nazwisko, email, wiadomosc], (err, result) => {
        if (err) {
            console.error('Błąd podczas zapisu do bazy danych:', err);
            return res.status(500).send('Błąd serwera.');
        }
        console.log(`Zapisano wiadomość o ID: ${result.insertId}`);
        res.redirect('/');
    });
});


app.get('/api/contact-messages', (req, res) => {
  const sql = 'SELECT * FROM messages ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Błąd przy pobieraniu wiadomości:', err);
      return res.status(500).json({ error: 'Błąd serwera.' });
    }
    res.json(results);
  });
});


app.get('/api/contact-messages/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM messages WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Błąd przy pobieraniu wiadomości:', err);
      return res.status(500).json({ error: 'Błąd serwera.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Nie znaleziono wiadomości o podanym ID.' });
    }

    res.json(results[0]);
  });
});


app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`)
})






