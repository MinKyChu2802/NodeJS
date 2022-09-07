import express from 'express'
import bodyParser from 'body-parser'

import usersRoutes from './routes/user.js'

const app = express()
const PORT = 4000


app.use(bodyParser.json());

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    console.log('TEST')
    res.send('HELLO')
})

app.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`)
})