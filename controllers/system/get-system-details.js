
function  GetSystemDetailsController({getSystemDetails}){

    return async function handle(httpRequest){

        const result = await getSystemDetails()
    
        return {
            body:{
                statusCode:200,
                data: result,
                message: "Success"
            }
        }
    }

}
module.exports = GetSystemDetailsController
