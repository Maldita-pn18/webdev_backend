var Response = require('./response');
var response = new Response();
module.exports = (status, body, message) => {
    let error = {
        body: body,
        message: message
    }
    let data = {
        body: {
            auth: status != 200 ? false : true
        }
    }
    response.setState(status, error, data)
    return response.state
}