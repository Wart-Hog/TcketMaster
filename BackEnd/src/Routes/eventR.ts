import express from 'express' 
import moment from 'moment';
import { IEvent } from '../Interfaces/IEvent'
import { v4 as uuidv4 } from 'uuid';
import {body} from 'express-validator';
import {checkDate, checkTokenHeader} from '../middle/middlewere'
export const router = express.Router()
var events_list = require ('../../events_list.json')
var fs = require('fs')

router.get('', (_, res) =>{
    res.json(events_list)
})

router.get('/music',(req, res) =>{
    let events = events_list.filter((item: any) => item.type === "music")
    res.json(events)
})

router.get('/theatre', (_, res) =>{
    let events = events_list.filter((item: any) => item.type === "theatre")
    res.json(events)
})

router.get('/sport', (_, res) =>{
    let events = events_list.filter((item: any) => item.type === "sport")
    res.json(events)
})

router.get('/:id', ({params:{id}}, res) =>{
    let event = events_list.find((item: { id: string; }) => item.id == id)
    if(!event) res.status(404).json({message:"resource not found"})
    res.json(event)
})

router.post('',checkTokenHeader,({body: {name,type, place, dateTime, price}}, res) =>{
    let event: IEvent = {
        name,
        id: uuidv4(),
        type,
        place,
        dateTime,
        price
    }
    if (!checkDate(dateTime)) return res.status(400).json({message: 'incorrect date'});
    if ((type == "music" || type == "sport" || type == "theatre")){
        events_list = events_list.concat(event)
        const new_events_list = JSON.stringify(events_list, null, 2);
        fs.writeFileSync('events_list.json', new_events_list);
        return res.status(201).json("succesfully recorded")
    }else{
        res.status(400).json({message:"invalid body"})
    }  
})
router.delete('/:eventID',checkTokenHeader,({params:{eventID}}, res)=>{
    let toDelete = events_list.findIndex((item: { id: string; }) => item.id == eventID)
    if(toDelete == -1) return res.status(404).json({message:"resource not found"})
    events_list.splice(toDelete,1)
    const new_events_list = JSON.stringify(events_list, null, 2);
    fs.writeFileSync('events_list.json', new_events_list);
    res.status(201).json({message: "resource deleted"})
})
