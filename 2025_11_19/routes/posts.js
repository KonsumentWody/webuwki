const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all posts
router.get('/', async (req, res) => {
  const wpisy = await prisma.wpis.findMany({
    include: { kategoria: true, komentarze: true }
  });
  res.json(wpisy);
});

// GET one post by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const wpis = await prisma.wpis.findUnique({
    where: { id },
    include: { kategoria: true, komentarze: true }
  });
  if (!wpis) return res.status(404).json({ error: "Nie znaleziono wpisu" });
  res.json(wpis);
});

// CREATE post
router.post('/', async (req, res) => {
  const { tytul, tresc, kategoriaId } = req.body;
  if (!tytul || !tresc) return res.status(400).json({ error: "Pola 'tytul' i 'tresc' są wymagane" });

  try {
    const result = await prisma.wpis.create({
      data: {
        tytul,
        tresc,
        kategoriaId: kategoriaId || null,
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE post
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { tytul, tresc, kategoriaId } = req.body;
  if (!tytul || !tresc) return res.status(400).json({ error: "Pola 'tytul' i 'tresc' są wymagane" });

  try {
    const result = await prisma.wpis.update({
      where: { id },
      data: {
        tytul,
        tresc,
        kategoriaId: kategoriaId || null,
      }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE post
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.wpis.delete({ where: { id } });
    res.json({ message: "Wpis usunięty" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
