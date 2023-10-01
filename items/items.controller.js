const fs = require('fs');
const path = require('path');
const dataPath = path.join("C:", "Users", "USER", "Desktop", "expresjs assignment", "db", "items.json")


// get all items with the GET method//
function getAll(req, res) {

  const { name, price, size } = req.query


  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "server error, file path not found" })
    }
    const dataObj = JSON.parse(data);

    if (name || price || size) {
      const filteredItem = dataObj.filter(el => {
        return (name && gel.name === name) ||
          (price && el.price === parseInt(price)) ||
          (size && el.size === size);
      });

      return res.status(200).json({ Message: 'success', Size: filteredItem.length, items: filteredData });
    }

    res.status(200).json({ Message: 'success', Size: dataObj.length, items: dataObj })
  })
}

// get only one item using the GET method//
function getOneItem(req, res) {
  const { id } = req.params;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "server error, file path not found" })
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

// create Item with the POST method //
function createItem(req, res) {
  const body = req.body;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).json({ message: "can't read file" });
    }
    const jsonObj = JSON.parse(data);
    const lastId = jsonObj[jsonObj.length - 1].id;
    const newId = lastId + 1;
    const newObj = Object.assign(body, { id: newId });
    jsonObj.push(newObj);
    fs.writeFile(dataPath, JSON.stringify(jsonObj), (err) => {
      if (err) {
        res.status(500).json({ Message: 'fail to locate filePath' });
      } else {
        res.status(201).json({ Message: 'new item has been created', Size: jsonObj.length, items: jsonObj });
      }
    });

  });
};


// updating data with the PATCH/PUT method//
function updateItem(req, res) {
  const { id } = req.params;
  const body = req.body;

  // reading from inter database
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "fail to read filePath" });
    }
    const jsonObj = JSON.parse(data);
    const jsonIndex = jsonObj.findIndex((el) => el.id === id * 1);
    const updatedItem = (jsonObj[jsonIndex] = {
      ...jsonObj[jsonIndex],
      ...body,
    });

    // Writting to internal database
    fs.writeFile(dataPath, JSON.stringify(jsonObj), (err) => {
      if (err) {
        res.status(500).json({ result: 'Server Error', Message: 'fail to locate filePath' });
      } else {
        res.status(201).json({ result: 'Success', Message: 'Item has been updated succesfully', updatedItem });
      }
    });
  });

}



// Deleting item with the DELETE method//
function deleteItem(req, res) {
  const { id } = req.params;
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: "fail to read filePath" });
    }
    const jsonObj = JSON.parse(data);
    const jsonIndex = jsonObj.findIndex((el) => el.id === id * 1);

    if (jsonIndex === -1) {
      res.status(404).json({ message: "can't find file to delete" });
    } else {
      jsonObj.splice(jsonIndex, 1);

      fs.writeFile(dataPath, JSON.stringify(jsonObj), (err) => {
        if (err) {
          res.status(500).json({ result: 'Server Error', Message: 'fail to locate filePath' });
        }
        res.status(200).json({ result: 'Success', Message: 'Item has been deleted succesfully' });
      });
    }
  });
}
module.exports = {
  getAll,
  getOneItem,
  createItem,
  updateItem,
  deleteItem,
};
