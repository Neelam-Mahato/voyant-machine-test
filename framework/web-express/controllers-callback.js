
module.exports =function ControllerCallback(controller){
    return (req,res) => {
    const httpRequest = {
        body: req.body,
        headers: req.headers,
        result:res,
        params: req.params,
        headers: {
               'Content-Type': req.get('Content-Type'),
               Referer: req.get('referer'),
           }
    }
    controller(httpRequest).then(httpResponse =>{      

        if (httpResponse.headers) {
            res.set(httpResponse.headers)
        }
            res.type('json')
            res.status(httpResponse.body.statusCode).send(httpResponse.body);
       

    }).catch(e => {
        res.status(500).json({
            e
        });
    })
    }
}