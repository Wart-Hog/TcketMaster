import express from 'express' 
import {IUser} from '../Interfaces/IUser'
import { IEvent } from '../Interfaces/IEvent'
import { checkTokenHeader } from '../middle/middlewere';
import { ITicket } from '../Interfaces/ITicket';
import { v4 as uuidv4 } from 'uuid';
export const router = express.Router()
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator()
var events_list = require ('../../events_list.json')
var users_list = require ('../../users_list.json')
var fs = require('fs')

router.get('', (_, res) =>{
    res.json(users_list)
})

router.get('/:username',checkTokenHeader, ({params:{username}}, res) =>{
    let user = users_list.find((item: { username: string; }) => item.username == username)
    if(!user) return res.status(404).json({message:"resource not found"})
    res.json(user)
})

router.post('', ({body: {name,username,password,tickets=[]}},res)=>{
    let user : IUser = {
        name,
        username,
        password,
        tickets,
    }
    users_list = users_list.concat(user)
    const new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json("created")
})
router.post('/login',({body: {username, password}}, res) =>{
    console.log(username)
    console.log(password)
    const newtoken = token.generate()
    const userIndex = users_list.findIndex((item: { username: string, password: string }) => 
                        item.username === username && item.password === password)
    if(userIndex ==-1) return res.status(404).json({message: "user not found"})
    users_list[userIndex].token = newtoken
    const new_users_list = JSON.stringify(users_list,null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json(newtoken)
})

router.post('/:username/tickets', ({body: {eventId}, params: {username}}, res) =>{
    const event = events_list.find((item: { id: string }) => item.id == eventId)
    if(!event) return res.status(404).json({message: "event not found"})
    const userIndex = users_list.findIndex((item: { username: string }) => item.username == username)
    if(userIndex ==-1) return res.status(404).json({message: "user not found"})
    let newticket: ITicket ={
        id: uuidv4(),
        event
    }
    users_list[userIndex].tickets.push(newticket)
    const new_users_list = JSON.stringify(users_list,null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json({message: "ticket created"})
})

router.get('/:username/tickets', ({params: {username}}, res) =>{
    const usernameIndex = users_list.findIndex((item: { username: string }) => item.username == username)
    if (usernameIndex == -1) return res.status(404).json({message:"user not found"})
    res.json(users_list[usernameIndex].tickets)
})

router.delete('/',({body: {username}},res)=>{
    const toDeleted = users_list.find((item: { username: string }) => item.username == username)
    if(!toDeleted) return res.status(404).json({message:"resource not found"})
    users_list = users_list.splice(toDeleted,1)
    const new_users_list = JSON.stringify(users_list, null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json({message: "resource deleted"})
})