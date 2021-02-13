import express from 'express' 
import { uuid } from 'uuidv4'
import { IEvent } from '../Interfaces/IEvent'
import { v4 as uuidv4 } from 'uuid';
export const router = express.Router()
var db = require ('../../DB.json')
var fs = require('fs')


router.get('', (_, res) =>{
    res.json("ciao")
})

router.post('', ({body: {type, place, dateTime}}, res) =>{
    let event: IEvent = {
        id: uuidv4(),
        type,
        place,
        dateTime
    }
    db = db.concat(event)
    const newDb = JSON.stringify(db);
    console.log(event)
    console.log(newDb)
    fs.writeFileSync('DB.json',  newDb  );
    res.json("ok")


})