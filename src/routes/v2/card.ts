import express from 'express'
import * as CardRepository from '../../repositories/v2/CardRepository.js';
import { randomUUID } from 'crypto';
const router = express.Router({ mergeParams: true })
router.use(express.json())

// GET /all
router.get('/', async (req, res) => {
  try {
    res.status(200).json(await CardRepository.findCards())
  } catch (error) {
      res.status(500).json({errorMessage:"An error occured while trying to find all cards!"})
  }
  })

  
  // GET /:uuid
  router.get('/:uuid', async (req, res) => {
    const cardId = req.params.uuid
    if (!cardId) {
      res.status(404).json({errorMessage:"No id given!"})
    }
    try {
    res.status(200).json(await CardRepository.findCardById(cardId))
    } catch (error) {
        res.status(500).json({errorMessage:"An error occured while trying to find your card!"})
    }
  })
  
  // POST /

  router.post('/:userId', async (req, res) => {
    const userId = req.params.userId
    if (!userId) {
      res.status(404).json({errorMessage:"No user id found!"})
    }
    try {//4429306018826921, 'mastercard', '07/27', 789, userId 
      res.status(201).json(await CardRepository.createCard(req.params.userId, req.body))
    } catch (error) {
        console.log(error)
        res.status(500).json({errorMessage:"An error occured while trying to create your card!"})
    }
  })
  
  // DELETE /:uuid
  router.delete('/:uuid', async (req, res) => {
    const cardId = req.params.uuid
    if (!cardId) {
      res.status(404).json({errorMessage:"No card with this id found!"})
    }
    try {
      res.status(204).json(await CardRepository.deleteCard(cardId))
  
    } catch (error:any) {
      console.error(error)
        res.status(500).json({error: error})
    }
    
  })


  
export default router