import express from 'express' 
import {IUser} from '../Interfaces/IUser'
import { IEvent } from '../Interfaces/IEvent'
export const router = express.Router()
var events_list = require ('../../events_list.json')
var users_list = require ('../../users_list.json')
var fs = require('fs')

router.get('', (_, res) =>{
    res.json(users_list)
})

router.get('/:username', ({params:{username}}, res) =>{
    let user = users_list.find((item: { username: string; }) => item.username == username)
    if(!user) res.status(404).json({message:"resource not found"})
    res.json(user)
})


router.post('', ({body: {name,username,password,tickets=[]}},res)=>{
    let user : IUser = {
        name,
        username,
        password,
        tickets
    }
    users_list = users_list.concat(user)
    const new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json("ok")
})

router.post('/:username/tickets', ({body: {eventId}, params: {username}}, res) =>{
    const event = events_list.find((item: { id: any }) => item.id == eventId)
    if(!event) return res.status(404).json({message: "event not found"})
    const userIndex = users_list.findIndex((item: { username: any }) => item.username == username)
    if(userIndex ==-1) return res.status(404).json({message: "user not found"})
    users_list[userIndex].tickets = users_list[userIndex].tickets.concat(event)
    const new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
})

router.delete('/',({body: {username}},res)=>{
    const toDeleted = users_list.find((item: { username: string }) => item.username == username)
    if(!toDeleted) res.status(404).json({message:"resource not found"})
    users_list = users_list.splice(toDeleted,1)
    const new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json({message: "resource deleted"})
})