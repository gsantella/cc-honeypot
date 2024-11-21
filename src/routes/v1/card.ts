
import express from 'express';
import * as CardRepository from '../../repositories/v1/CardRepository.js';
import { z } from 'zod';

const router = express.Router({ mergeParams: true });

router.use(express.json()); // Middleware to parse JSON request body

// Define the schema using Zod
const uuidSchema = z.object({
  uuid: z.string().uuid(),
});

// Route to check connection to the database
router.get('/check-connection', async (_, res) => {
  try {
    const result = await CardRepository.findCards();
    res.json({ message: 'Connection successful', result });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error checking connection', error: errorMessage });
  }
});

// Get all cards
router.get('/', async (_, res) => {
  try {
    const allCards = await CardRepository.findCards();
    res.json(allCards);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error fetching cards', error: errorMessage });
  }
});

// Get a card by ID
router.get('/:id', async (req, res) => {
  try {
    const card = await CardRepository.findCardById(req.params.id);
    if (!card) {
      throw new Error('Card not found');
    }
    res.json(card);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(404).json({ message: 'Card not found', error: errorMessage });
  }
});

// Create a new card
router.post('/', async (req, res) => {
  try {
    // Validate the request body against the schema
    const { uuid } = uuidSchema.parse(req.body);

    // Create the card using the provided uuid
    const newCard = await CardRepository.createCard(uuid);
    res.status(201).json(newCard);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: 'Validation error', errors: error.errors });
    } else {
      const errorMessage = (error as Error).message;
      res.status(500).json({ message: 'Error creating card', error: errorMessage });
    }
  }
});

// Delete a card by ID
router.delete('/:id', async (req, res) => {
  try {
    await CardRepository.deleteCard(req.params.id);
    res.json({ message: 'Card deleted' });
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: 'Error deleting card', error: errorMessage });
  }
});

export default router;
=======
/**
 * Express router for handling card-related routes.
 * 
 * @module routes/v1/card
 * @requires express
 */
import express from 'express';
const cards = new Map<string, any>();

const router = express.Router({ mergeParams: true });

// Get all cards
router.get('/', (req, res) => {
    res.json(Array.from(cards.values()));
});

// Get a card by UUID
router.get('/:uuid', (req, res) => {
    const card = cards.get(req.params.uuid);
    if (card) {
        res.json(card);
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

// Create a new card
router.post('/', (req, res) => {
    const { uuid, card_num, user_id } = req.body;
    const newCard = { uuid, card_num, user_id };
    cards.set(uuid, newCard);
    res.status(201).json(newCard);
});

// Delete a card by UUID
router.delete('/:uuid', (req, res) => {
    const card = cards.get(req.params.uuid);
    if (card) {
        cards.delete(req.params.uuid);
        res.json({ message: 'Card deleted' });
    } else {
        res.status(404).json({ message: 'Card not found' });
    }
});

export default router;

