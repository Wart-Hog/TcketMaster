const {validationResult} = require('express-validator');
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
exports.myValidationResult