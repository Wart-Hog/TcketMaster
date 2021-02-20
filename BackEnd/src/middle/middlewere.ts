import {check, validationResult} from 'express-validator';
var users_list = require ('../../users_list.json')
import moment, { relativeTimeRounding } from 'moment';
import bluebird  from "bluebird";
let fs = bluebird.promisifyAll(require('fs'));

const typeAcceppted =  ["music","sport","theatre"]

export const newUserValidator = [
  check('name').trim().not().isEmpty().withMessage('name is required'),
  check('username').trim().not().isEmpty().withMessage('username is required'),
  check('password').trim().not().isEmpty().withMessage('password is required'),
  check('password').trim().isLength({ min: 6 }).withMessage('password is must be 6 long')
]
export const eventValidator = [
  check('name').trim().not().isEmpty().withMessage('name is required'),
  check('place').trim().not().isEmpty().withMessage('place is required'),
  check('type').isIn(typeAcceppted).withMessage('select at least one category'),
  check('dateTime').trim().not().isEmpty().withMessage('valid date is required'),
  check('price').trim().not().isEmpty().withMessage('price is required'),
]
export const myValidationResult = (req: any,res:any,next:any) =>{
  const result = validationResult(req)
  const hasErr = !result.isEmpty()
  if (hasErr) {
    const err = result.array()[0].msg
    return res.status(400).json({success: false, message: err})
  }
  next()
}
export const checkDate = ({body: {dateTime}}: any,res:any,next:any) =>{
  var aDate = moment(dateTime, 'DD/MM/YYYY');
  if (aDate.isValid()) {
    next()
  }
  else return res.status(400).json({message: "invalid date format"});
}
export const checkTokenHeader = async (req: any,res:any,next:any)=>{
  const readList: any = await JSON.parse(fs.readFileSync('users_list.json'))
  const userToken = req.header('token')
  if(!userToken) return res.status(401).json('missing token')
  if (readList.find((item: any) => item.token === userToken)){
    next()
  }else{
    return res.status(401).json('invalid token')
  }
}
export const findUserIndex = async ({params: {username}}: any,res:any,next:any)=>{
  const readList: any = await JSON.parse(fs.readFileSync('users_list.json'))
  const usernameIndex = readList.findIndex((item: { username: string }) => item.username == username)
  if (usernameIndex == -1) return res.status(404).json({message:"user not found"})
  else {
    res.locals.usernameIndex = usernameIndex
    next()
  }
}
export const writeOnJson = async(path:string, value:any, res:any) =>{
  try { 
    await fs.writeFileSync(path, JSON.stringify(value, null, 2));
  }catch(err) { 
    return res.status(400).json({message: err})
  }
  return res.status(201).json({message: "writed"})
}
export const readFromJson = async(path:string, res:any) =>{
  try { 
    const readList: any = await JSON.parse(fs.readFileSync(path))
    return readList
  }catch(err) { 
    return res.status(400).json({message: err})
  }
}
export const validateUsername = async ({body:{username}}: any,res:any,next:any) =>{
  const readList: any =await JSON.parse(fs.readFileSync('users_list.json'))
  if (readList.find((item: { username: string }) => item.username == username)) return res.status(400).json({message: "username already in use"})
    else {
      next()
    }
}
