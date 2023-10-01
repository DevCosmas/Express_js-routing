const fs = require('fs')
const path = require('path')
const userPath = path.join("C:", "Users", "USER", "Desktop", "expresjs assignment", "db", "user.json")

const requestBody = (req, res, next) => {

    if (!req.body) {
        res.status(401).json({
            Data: null,
            Message: 'error in request body. User denied access!'
        });

    }
    next()
}
const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        res.status(401).json({ message: "invalid username or password" })
    }
    const base64 = new Buffer.from(authHeader.split(" ")[1], 'base64')
    const base64String = base64.toString()
    const [username, password] = base64String.split(":")

    fs.readFile(userPath, 'utf8', (err, data) => {
        if (err) { res.status(404).json({ Message: 'Can not read file' }) }
        const dataObj = JSON.parse(data)
        const findUser = dataObj.find((el) => el.username === username && el.password === password)
        if (!findUser) { res.status(404).json({ Message: 'cannot find user data. invalid username or password' }) }

        next()

    })


}


const apiKeys = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) { res.status(401).json({ Message: 'Authentication failed!' }) }
    const api_key = authHeader.split(' ')[1]

    fs.readFile(userPath, 'utf8', (err, data) => {
        if (err) { res.status(404).json({ Message: 'can not read file' }) }
        const dataObj = JSON.parse(data)
        const findUser = dataObj.find((el) => el.api_key === api_key)
        if (!findUser && !findUser.api_key) { res.status(404).json({ Message: 'cannot find user data. Put in the right api_key' }) }
        next()

    })
}
const checkStaff = (req, res, next) => {

    const authHeader = req.headers.authorization

    if (!authHeader) { res.status(401).json({ Message: 'Authentication failed!' }) }
    const api_key = authHeader.split(' ')[1]

    fs.readFile(userPath, 'utf8', (err, data) => {
        if (err) { res.status(404).json({ Message: 'Can not read file' }) }
        const dataObj = JSON.parse(data)
        const findUser = dataObj.find((el) => el.api_key === api_key)
        if (findUser.user_type === 'staff') {
            console.log(findUser.user_type)
            next()
        }
        else {

            res.status(404).json({ Message: 'Authorization failed. You are not authorized to use this resource' })
        }

    })
}
module.exports = { requestBody, basicAuth, apiKeys, checkStaff }