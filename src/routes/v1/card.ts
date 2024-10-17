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
    /*const { uuid, card_num, card_issuer, card_expiration, card_Cvv, user_id } = req.body;
    const newCard = { uuid, card_num, card_issuer, card_expiration, card_Cvv, user_id };
    cards.set(uuid, newCard);
    res.status(201).json(newCard);*/
});

export default router;
