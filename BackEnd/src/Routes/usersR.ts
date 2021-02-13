import express from 'express' 
import {IUser} from '../Interfaces/IUser'
export const router = express.Router()
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

router.delete('/',({body: {username}},res)=>{
    const toDeleted = users_list.find((item: { username: string }) => item.username == username)
    if(!toDeleted) res.status(404).json({message:"resource not found"})
    users_list = users_list.splice(toDeleted,1)
    const new_users_list = JSON.stringify(users_list);
    fs.writeFileSync('users_list.json', new_users_list);
    res.status(201).json({message: "resource deleted"})
})