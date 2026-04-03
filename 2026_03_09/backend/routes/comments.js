const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all comments
router.get('/', async (req, res) => {
  const komentarze = await prisma.komentarz.findMany({
    include: { wpis: true }
  });
  res.json(komentarze);
});

// GET one comment by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const komentarz = await prisma.komentarz.findUnique({
    where: { id },
    include: { wpis: true }
  });
  if (!komentarz) return res.status(404).json({ error: "Nie znaleziono komentarza" });
  res.json(komentarz);
});

// CREATE comment
router.post('/', async (req, res) => {
  const { autor, tresc, wpisId } = req.body;
  if (!autor || !tresc || !wpisId) return res.status(400).json({ error: "Pola 'autor', 'tresc' i 'wpisId' są wymagane" });

  try {
    const result = await prisma.komentarz.create({
      data: {
        autor,
        tresc,
        wpisId,
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE comment
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { autor, tresc } = req.body;
  if (!autor || !tresc) return res.status(400).json({ error: "Pola 'autor' i 'tresc' są wymagane" });

  try {
    const result = await prisma.komentarz.update({
      where: { id },
      data: {
        autor,
        tresc,
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE comment
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.komentarz.delete({ where: { id } });
    res.json({ message: "Komentarz usunięty" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
