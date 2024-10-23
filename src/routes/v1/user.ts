/**
 * Express router for handling user-related routes.
 * 
 * @module routes/v1/user
 * @requires express
 */
import express from 'express';
const users = new Map<string, any>();

const router = express.Router({ mergeParams: true });

// Get all Users
router.get('/', (req, res) => {
    res.json(Array.from(users.values()));
});

// Get a User by id
router.get('/:id', (req, res) => {
    const user = users.get(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Get a User by user_name
router.get('/:user_name', (req, res) => {
    const user = users.get(req.params.user_name);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Create a new User
router.post('/', (req, res) => {
    const { id, user_name } = req.body;
    const newUser = { id, user_name };
    users.set(id, newUser);
    res.status(201).json(newUser);
});

// Delete a User by ID
router.delete('/:user_id', (req, res) => {
    const user = users.get(req.params.user_id);
    if (user) {
        users.delete(req.params.user_id);
        res.json({ message: 'User deleted' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
export default router