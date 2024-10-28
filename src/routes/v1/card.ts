import express from 'express';
import { LithicCardModel } from '../models/LithicCardModel'; // Use path alias

const router = express.Router({ mergeParams: true });

// Get all cards
router.get('/', async (_, res) => {
    try {
        const allCards = await LithicCardModel.getAllCards();
        res.json(allCards);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error fetching cards', error: errorMessage });
    }
});

// Get a card by UUID
router.get('/:uuid', async (req, res) => {
    try {
        const card = await LithicCardModel.getCard(req.params.uuid);
        res.json(card);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(404).json({ message: 'Card not found', error: errorMessage });
    }
});

// Create a new card
router.post('/', async (_, res) => {
    try {
        const newCard = await LithicCardModel.createCard();
        res.status(201).json(newCard);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error creating card', error: errorMessage });
    }
});

// Delete a card by UUID
router.delete('/:uuid', async (req, res) => {
    try {
        await LithicCardModel.deleteCard(req.params.uuid);
        res.json({ message: 'Card deleted' });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(500).json({ message: 'Error deleting card', error: errorMessage });
    }
});

export default router;