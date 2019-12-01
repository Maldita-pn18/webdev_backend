const model = require('./schema')
module.exports = () => {
    let add = {
        "username": "admin",
        "password": "admin",
        "name": {
            "firstname":"Admin",
            "lastname": "Admin",
            "middlename": "Admin",
            "suffix": "Admin"
        },
        "position": "Admin"
    }
    let account = new model.Accounts(add);
    account
        .save()
        .then((result) => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}