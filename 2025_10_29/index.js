const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

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
  console.log('Otrzymano dane z formularza:');
  console.log(`Imię: ${imie}`);
  console.log(`Nazwisko: ${nazwisko}`);
  console.log(`Email: ${email}`);
  console.log(`Wiadomość: ${wiadomosc}`);
  res.redirect('/'); // przekierowanie na stronę główną
});
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
