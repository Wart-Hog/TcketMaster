import express from 'express' 
import { uuid } from 'uuidv4'
import { IEvent } from '../Interfaces/IEvent'
import { v4 as uuidv4 } from 'uuid';
export const router = express.Router()
var events_list = require ('../../events_list.json')
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
    events_list = events_list.concat(event)
    const new_events_list = JSON.stringify(events_list);
    console.log(event)
    console.log(new_events_list)
    fs.writeFileSync('events_list.json',  new_events_list  );
    res.json("ok")


})