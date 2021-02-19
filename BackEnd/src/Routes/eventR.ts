import express from 'express' 
import { IEvent } from '../Interfaces/IEvent'
import { v4 as uuidv4 } from 'uuid';
import {checkDate, checkTokenHeader, writeOnJson, readFromJson, eventValidator, myValidationResult} from '../middle/middlewere'
import { IUser } from '../Interfaces/IUser';
export const router = express.Router()
import bluebird  from "bluebird";
var events_list = require ('../../events_list.json')
let fs = bluebird.promisifyAll(require('fs'));

router.get("/", async ({query:{offset= 0, limit = 3}}, res) => {
    if(!offset && !limit)return res.status(200).json(events_list);
    let temp:Array<any>=[] 
    events_list.forEach((element: any) =>temp.push(element));
    if (offset < 0) offset = 0
    if (offset > temp.length) offset = (temp.length-1)
    return res.status(200).json(temp.slice(Number(offset), Number(offset) + Number(limit)));
});
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
router.post('',checkTokenHeader,eventValidator, myValidationResult,checkDate, async ({body: {name,type, place, dateTime, price}}:any, res:any) =>{
    let event: IEvent = {
        name,
        id: uuidv4(),
        type,
        place,
        dateTime,
        price
    }
    events_list = events_list.concat(event)
    await fs.writeFileSync('events_list.json', JSON.stringify(events_list, null, 2));
    return res.status(201).json(event)
})
router.delete('/:eventID',checkTokenHeader,async ({params:{eventID}}, res)=>{
    const readList: any = await readFromJson('users_list.json', res)
    let toDelete = events_list.findIndex((item: { id: string; }) => item.id == eventID)
    if(toDelete == -1) return res.status(404).json({message:"resource not found"})
    readList.forEach((user: any) => {
        user.tickets.forEach((element: any) => {
            element.event.dateTime = element.event.id == eventID ? "canceled" :element.event.dateTime
        })
    });
    events_list.splice(toDelete,1)
    try { 
        await fs.writeFileSync('users_list.json', JSON.stringify(readList, null, 2));
      }catch(err) { 
        return res.status(400).json({message: err})
      }
    writeOnJson('events_list.json',events_list,res)
})
