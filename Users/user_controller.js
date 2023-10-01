const fs = require('fs')
const path = require('path')
const userPath = path.join("C:", "Users", "USER", "Desktop", "expresjs assignment", "db", "user.json")

async function signUp(req, res) {

    const body = await req.body;

    if (body.role === "staff") {
        body.isAdmin = true
        body.api_key = `${body.username}_${body.password}`;
    }

    else {
        body.isAdmin = false
    }

    fs.readFile(userPath, 'utf8', async (err, data) => {
        if (err) console.log('cannot read file')
        const JsonObj = await JSON.parse(data)
        JsonObj.push(body)
        fs.writeFile(userPath, JSON.stringify(JsonObj), (err) => {
            if (err) {
                res.status(500).json({ result: "Fail", message: "cannot write file to db" });
            }
            res.status(201).json({ result: "Success", Message: 'You have succesfully signed up', userProfile: body });
        });
    })
}

module.exports = { signUp }