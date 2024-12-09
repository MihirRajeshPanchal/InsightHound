
import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/auth.js';
import { parseBody } from '../lib/helpers.js';
import { companyEntity } from '../structure/entities.js';
const prisma = new PrismaClient();
const router = express.Router();

// CRUD API for company
router.get('/', authMiddleware, async (req, res) => {
  try {
    const companys = await prisma.company.findMany();
    res.json(companys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching companys' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const parsedBody = parseBody(req.body, companyEntity.attributes);
    const company = await prisma.company.create({
      data: { ...parsedBody, user: { connect: { id: req.user.id } } },
    });
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating a company' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const parsedBody = parseBody(req.body, companyEntity.attributes);
    const company = await prisma.company.update({
      where: { id: Number(id) },
       data: { ...parsedBody, user: { connect: { id: req.user.id } } },
    });
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the company' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const company = await prisma.company.delete({
      where: { id: Number(id) },
    });
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the company' });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const company = await prisma.company.findFirst({
      where: { id: Number(id) },
    });
    res.json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching companys' });
  }
});

export default router;