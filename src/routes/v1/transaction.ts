import express from 'express';
import * as TransactionRepository from '../../repositories/v1/TransactionRepository.js';

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
    try {
        const transactions = await TransactionRepository.findTransaction();
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

router.get('/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const transaction = await TransactionRepository.findTransactionById(uuid);
        res.json(transaction);
    } catch (error) {
        console.error('Error fetching transaction:', error);
        res.status(500).json({ error: 'Failed to fetch transaction' });
    }
});

router.post('/', async (req, res) => {
    try {
        const newTransaction = req.body;
        const createdTransaction = await TransactionRepository.createTransaction(newTransaction);
        res.status(201).json({ message: 'Transaction created successfully', transaction: createdTransaction });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
});

router.delete('/:uuid', async (req, res) => {
    try {
        const { uuid } = req.params;
        const deletedTransaction = await TransactionRepository.deleteTransaction(uuid);
        res.json({ message: 'Transaction deleted successfully', transaction: deletedTransaction });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
});

router.get('/about', (req, res) => {
    res.send('About Transactions');
});


export default router;