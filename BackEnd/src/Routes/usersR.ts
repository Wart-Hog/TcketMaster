import express from 'express' 
import {IUser} from '../Interfaces/IUser'
import { checkTokenHeader, findUserIndex, writeOnJson } from '../middle/middlewere';
import { ITicket } from '../Interfaces/ITicket';
import { v4 as uuidv4 } from 'uuid';
import bluebird  from "bluebird";
export const router = express.Router()
const TokenGenerator = require('uuid-token-generator');
const token = new TokenGenerator()
var users_list = require ('../../users_list.json')
let fs = bluebird.promisifyAll(require('fs'));
router.get('', (_, res) =>{
    res.status(200).json(users_list)
})
router.get('/:username',checkTokenHeader, findUserIndex, (_, res) =>{
    const {usernameIndex} = res.locals
    res.json(users_list[usernameIndex])
})
router.put('/:username', ({body: {admin}}, res) =>{
    const {usernameIndex} = res.locals
    users_list[usernameIndex].admin = admin
    writeOnJson('users_list.json',users_list,res)
})
router.post('', ({body: {name,username,password,tickets=[]}},res)=>{
    let user : IUser = {
        name,
        username,
        password,
        tickets,
        admin : false
    }
    users_list = users_list.concat(user)
    writeOnJson('users_list.json',users_list,res)
})
router.post('/login',({body: {username, password}}, res) =>{
    const newtoken = token.generate()
    const userIndex = users_list.findIndex((item: { username: string, password: string }) => 
                        item.username === username && item.password === password)
    if(userIndex ==-1) return res.status(404).json({message: "user not found"})
    users_list[userIndex].token = newtoken
    const new_users_list = JSON.stringify(users_list,null, 2);
    fs.writeFileSync('users_list.json', new_users_list);
    res.json(newtoken)
})
router.post('/:username/tickets',checkTokenHeader, findUserIndex, ({body: {eventId}}, res) =>{
    const readList = JSON.parse(fs.readFileSync('events_list.json'))
    const event = readList.find((item: { id: string }) => item.id == eventId)
    if(!event) return res.status(404).json({message: "event not found"})
    const {usernameIndex} = res.locals
    let newticket: ITicket ={
        id: uuidv4(),
        event
    }
    users_list[usernameIndex].tickets.push(newticket)
    writeOnJson('users_list.json',users_list,res)
})
router.delete('/:username/tickets/:ticketId',checkTokenHeader,findUserIndex, ({params: {ticketId}}, res) =>{
    const {usernameIndex} = res.locals
    const ticket = users_list[usernameIndex].tickets.findIndex((item:{ id: any;}) => item.id == ticketId)
    if(ticket === -1) return res.status(404).json({message: "ticket not found"})
    users_list[usernameIndex].tickets.splice(ticket,1)
    writeOnJson('users_list.json',users_list,res)
})
router.get('/:username/tickets',checkTokenHeader,findUserIndex,(_, res) =>{
    const {usernameIndex} = res.locals
    res.json(users_list[usernameIndex].tickets)
})
router.delete('/:username',checkTokenHeader,findUserIndex,(_,res)=>{
    const {usernameIndex} = res.locals
    users_list.splice(usernameIndex,1)
    writeOnJson('users_list.json',users_list,res)
})