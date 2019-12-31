const fs = require('fs')

// given a json file with an array of objects
// assume each object has an integer id in field '_id'
// return an integer id with value 1 greater than the max existing id in the file
exports.generateId = (fileName) => {
  const jsonObjectArray = this.readJsonObjectsFromFile(fileName)
  const ids = []
  jsonObjectArray.forEach(function (jsonObject) {
    ids.push(jsonObject._id)
  })
  var maxId = Math.max(...ids)
  console.log('max existing id found in file: ' + maxId)
  return maxId + 1
}

// read and parse the given json file, and return an array of objects
exports.readJsonObjectsFromFile = (fileToRead) => {
  console.log('in readJsonObjectsFromFile, reading from file ' + fileToRead)
  return JSON.parse(fs.readFileSync(fileToRead, 'utf8'))
}

// write the given array of json objects to the given file
exports.writeJsonObjectsToFile = (jsonObjects, outputFilename) => {
  console.log('writing json object to file ' + outputFilename)
  fs.writeFile(outputFilename, JSON.stringify(jsonObjects, null, 4), function (err) {
    if (err) {
      console.log('error', err)
    } else {
      console.log('JSON saved to ' + outputFilename)
    }
  })
}
