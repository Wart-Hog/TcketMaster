const {validationResult} = require('express-validator');
var users_list = require ('../../users_list.json')
import moment from 'moment';
import bluebird  from "bluebird";
let fs = bluebird.promisifyAll(require('fs'));

const myValidationResult = validationResult.withDefaults({
  formatter: (error: { location: any; }) => {
    return {
      myLocation: error.location,
    };
  },
});
export const checkDate = (date: string) =>{
  var aDate = moment(date, 'DD/MM/YYYY');
  return aDate.isValid();
}
export const checkTokenHeader = async (req: any,res:any,next:any)=>{
  const userToken = req.header('token')
  if(!userToken) return res.status(401).json('missing token')
  if (users_list.find((item: any) => item.token === userToken)){
    next()
  }else{
    res.status(401).json('invalid token')
  }
}
export const findUserIndex = async ({params: {username}}: any,res:any,next:any)=>{
  const usernameIndex = users_list.findIndex((item: { username: string }) => item.username == username)
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
exports.myValidationResult