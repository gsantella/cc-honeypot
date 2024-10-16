import express from 'express'

import v1 from './routes/v1/router.js'
import v2 from './routes/v2/router.js'

const app = express()
const port = 3000

// default route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// bring in each api version
app.use('/v1', v1);
app.use('/v2', v2)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})