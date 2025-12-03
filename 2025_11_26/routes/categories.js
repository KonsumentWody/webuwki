const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all categories
router.get('/', async (req, res) => {
  const kategorie = await prisma.kategoria.findMany({
    include: { wpisy: true }
  });
  res.json(kategorie);
});

// GET one category by id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const kategoria = await prisma.kategoria.findUnique({
    where: { id },
    include: { wpisy: true }
  });
  if (!kategoria) return res.status(404).json({ error: "Nie znaleziono kategorii" });
  res.json(kategoria);
});

// CREATE category
router.post('/', async (req, res) => {
  const { nazwa } = req.body;
  if (!nazwa) return res.status(400).json({ error: "Pole 'nazwa' jest wymagane" });

  try {
    const result = await prisma.kategoria.create({
      data: { nazwa }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE category
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nazwa } = req.body;
  if (!nazwa) return res.status(400).json({ error: "Pole 'nazwa' jest wymagane" });

  try {
    const result = await prisma.kategoria.update({
      where: { id },
      data: { nazwa }
    });
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE category
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  try {
    await prisma.kategoria.delete({ where: { id } });
    res.json({ message: "Kategoria usunięta" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
