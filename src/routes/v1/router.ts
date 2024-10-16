import express from 'express'

import bird from './bird.js'
import card from './card.js'
import transaction from './transaction.js'
import user from './user.js'

const router = express.Router({ mergeParams: true })

// bring in the routes for v1
router.use('/bird', bird)
router.use('/card', card)
router.use('/transaction', transaction)
router.use('/user', user)

export default router