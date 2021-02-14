const {validationResult} = require('express-validator');
var users_list = require ('../../users_list.json')
import moment from 'moment';

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
  if(!userToken) res.status(401).json('missing token')
  if (users_list.find((item: any) => item.token === userToken)){
    next()
  }else{
    res.status(401).json('invalid token')
  }
}
exports.myValidationResult