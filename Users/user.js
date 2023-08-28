const fs = require('fs')
const path = require('path')
const userPath = path.join(__dirname, "db", "user.json")

function createUser(req, res) {
    const body = []
    req.on('data', (chunk) => {
        body.push(chunk)
    })
    req.on('end', () => {
        const bodyBuffer = Buffer.concat(body).toString()
        const bufferObj = JSON.parse(bodyBuffer)
        const userType = bufferObj.username.split(':')[0].toLowerCase()
        if (userType === 'staff') {
            bufferObj.api_key = `${bufferObj.username}_${bufferObj.password}`.split(':')[1]
            const username = bufferObj.username.split(':')[1]
            bufferObj.username = username
            bufferObj.user_type = "staff"
        } else {
            bufferObj.username.split(':')[1]
            bufferObj.userType = "customer"
            bufferObj.api_key = `${bufferObj.username}_${bufferObj.password}`
        }

        fs.readFile(userPath, 'utf8', (err, data) => {
            if (err) console.log('cannot read file')
            const dataObj = JSON.parse(data)
            dataObj.push(bufferObj)
            fs.writeFile(userPath, JSON.stringify(dataObj), (err) => {
                if (err) {
                    res.status(500).json({ message: "can't write file" });
                }
                res.status(200).json({ Message: 'succes' });
            });
        })
    })
}
module.exports = createUser
