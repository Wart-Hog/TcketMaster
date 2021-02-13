import express, { Response, response } from 'express' 
import {router as tickets} from './Routes/ticketsR'
import {router as users} from  './Routes/usersR'
import {router as events} from  './Routes/eventR'

const app = express()
const bodyParser = require ('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
module.exports = app.listen(3005)

app.use('/tickets',tickets)
app.use('/events',events)
app.use('/users',users)