import express from 'express'

const router = express.Router({ mergeParams: true })

router.get('/user', (req, res) => {
    res.send('GET all users.')
  })

router.get('/user/:uuid', (req, res) => {
    res.send('GET one user by uuid.')
  })

router.post('/user', (req, res) => {
    res.json(['POST one user.'])
  })

router.delete('/user', (req, res) => {
    res.send('DELETE one user by uuid.')
  })

export default router
