import express from 'express'
import * as BirdRepository from './../../repositories/v1/BirdRepository.js'

const router = express.Router({ mergeParams: true })

// define the home route
router.get('/', async (req, res) => {
    res.json(await BirdRepository.findBirds())
})

router.get('/:uuid', async (req, res) => {
    res.json(await BirdRepository.findBirdById('7c5f78e2-67e1-4dbc-a9be-e9bb196a256b'))
})

// define the about route
router.get('/about', (req, res) => {
   res.send('About birds')
})
  
export default router