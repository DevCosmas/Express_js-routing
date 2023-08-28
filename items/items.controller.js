const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'db', 'items.json');
console.log(dataPath)

// get all items/data with the GET method//
function getAll(req, res) {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).json({ message: "can't read file" })
    }
    const dataObj = JSON.parse(data);
    res
      .status(200)
      .json({ Message: 'success', Size: dataObj.length, Data: dataObj });
  });
}

// get only one element using the GET method//
function getOne(req, res) {
  const { id } = req.params;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log('file not read');
    }
    const dataObj = JSON.parse(data);
    const objIndex = dataObj.findIndex((el) => el.id === id * 1);
    if (objIndex === -1) {
      res.status(404).json({ message: 'file does not exist' });
    } else {
      const obj = dataObj[objIndex];
      res.status(200).json({ Message: 'success', Data: obj });
    }
  });
}

// function getByVariables(req,res){
//   const {name,price,size}=req.params
//   console.log(name,price,size) 
// }
// post data with the POST method //
function postData(req, res) {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    const buffer = Buffer.concat(body).toString();
    const bufferJson = JSON.parse(buffer);
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(404).json({ message: "can't read file" });
      }
      const dataObj = JSON.parse(data);
      const lastId = dataObj[dataObj.length - 1].id;
      const newId = lastId + 1;
      const newObj = Object.assign(bufferJson, { id: newId });
      dataObj.push(newObj);
      const final = JSON.stringify(dataObj);
      fs.writeFile(dataPath, final, (err) => {
        if (err) {
          res.status(404).json({ Message: 'failure' });
        } else {
          console.log('file written');
        }
      });
      res
        .status(200)
        .json({ Message: 'success', Size: dataObj.length, Data: dataObj });
    });
  });
}

// updating data with the PATCH/PUT method//
function update(req, res) {
  const { id } = req.params;

  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  });
  req.on('end', () => {
    const buffer = Buffer.concat(body).toString();
    const bufferJson = JSON.parse(buffer);
    fs.readFile(dataPath, 'utf8', (err, data) => {
      if (err) {
        res.status(404).json({ message: "can't read file" });
      }
      const dataObj = JSON.parse(data);
      const objIndex = dataObj.findIndex((el) => el.id === id * 1);
      const dataUpdate = (dataObj[objIndex] = {
        ...dataObj[objIndex],
        ...bufferJson,
      });
      const final = JSON.stringify(dataObj);
      fs.writeFile(dataPath, final, (err) => {
        if (err) {
          res.status(404).json({ Message: 'failure' });
        } else {
          res.status(200).json({ Message: 'success', Data: dataUpdate });
        }
      });
    });
  });
}

// Deleting item with the DELETE method//
function deleteData(req, res) {
  const { id } = req.params;
  console.log(id);
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      console.log('file not read');
    }
    const dataObj = JSON.parse(data);
    const objIndex = dataObj.findIndex((el) => el.id === id * 1);

    if (objIndex === -1) {
      res.status(404).json({ message: "can't find file to delete" });
    } else {
      dataObj.splice(objIndex, 1);
      const content = JSON.stringify(dataObj);
      fs.writeFile(dataPath, content, (err) => {
        if (err) {
          res.status(500).json({ message: "can't write file" });
        }
        res
          .status(200)
          .json({ Message: 'success', Size: dataObj.length, Data: dataObj });
      });
    }
  });
}
module.exports = {
  getAll,
  getOne,
  // getByVariables,
  postData,
  update,
  deleteData,
};
