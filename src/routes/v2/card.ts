import express from 'express'

const router = express.Router({ mergeParams: true })

// GET /
router.get('/', (req, res) => {
  res.send('I will get all credit cards')
})

// GET /:uuid
router.get('/:uuid', (req, res) => {
  res.send('I will get all credit cards with this UUID')
})

// POST /
router.post('/', (req, res) => {
  res.send('I will create a credit card')
})

// DELETE /:uuid
router.delete('/:uuid', (req, res) => {
  res.send('I will delete a credit card with this UUID')
})

export default router