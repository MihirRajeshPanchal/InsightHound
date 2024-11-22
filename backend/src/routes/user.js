
import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/auth.js';
import { parseBody } from '../lib/helpers.js';
import { userEntity } from '../structure/entities.js';
const prisma = new PrismaClient();
import { COOKIE_NAME } from '../lib/constants.js';
const router = express.Router();

// CRUD API for user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users' });
  }
});


router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const parsedBody = parseBody(req.body, userEntity.attributes);
    const user = await prisma.user.update({
      where: { id: Number(id) },
       data: parsedBody,
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user' });
  }
});

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

router.post('/signup', async (req, res) => {
  try {
    const parsedBody = parseBody(req.body, userEntity.attributes);
    const { email, password } = parsedBody;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        ...parsedBody,
        email,
        password: hashedPassword
      }
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });

    // res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    const { password: _, ...userWithoutPassword } = newUser;
    return res.status(201).json({user:userWithoutPassword, token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during signup' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const parsedBody = parseBody(req.body, userEntity.attributes);

    const { email, password } = parsedBody;
    
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

    // res.cookie(COOKIE_NAME, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    const { password: _, ...userWithoutPassword } = user;
    return res.json({user: userWithoutPassword, token});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

router.get('/getMe', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({user: userWithoutPassword});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching user data' });
  }
});

export default router;
