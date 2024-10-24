import express from 'express'

const router = express.Router({ mergeParams: true })

// define the home route
router.get('/', (req, res) => {
    res.send('tweeeeeeeeeeeeeeeeet page')
})

// define the about route
router.get('/about', (req, res) => {
   res.send('About birds')
})
  
export default router