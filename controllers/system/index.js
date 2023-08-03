

const {getSystemDetails}=require('../../use-cases/system/index');;

   
const GetSystemDetailsController = require('./get-system-details')({getSystemDetails});

module.exports={
    GetSystemDetailsController,
};