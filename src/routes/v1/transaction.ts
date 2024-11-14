import express from 'express'
import * as TransactionRepository from '../../repositories/v1/TransactionRepository.js'

const router = express.Router({ mergeParams: true })

// define the home route
router.get('/', async (req, res) => {
    res.json(await TransactionRepository.findTransaction())
})

router.get('/:uuid', async (req, res) => {
    res.json(await TransactionRepository.findTransactionById('8a8d0f38-72f3-4542-b6bb-9f80d345788d'))
})

// define the about route
router.get('/about', (req, res) => {
   res.send('About Transactions')
})
  
export default router