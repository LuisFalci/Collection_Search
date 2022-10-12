const fs = require("fs");

const PATH_BASE = "E:/HD Giovanni/Acervos";

let obj = [];

function search(path) {
  let files = fs.readdirSync(path);
  return files.map((elem) => {
    let stats = fs.statSync(path + "/" + elem);
    let upperCaseElem = elem.toUpperCase();
    if (stats.isFile()) {
      if((!upperCaseElem.includes(".DB")) && (!upperCaseElem.includes(".TXT")) && (!upperCaseElem.includes(".DOC"))){
      obj.push({ filepath: path+"/"+elem, name: elem });
    }
    return elem;
    } else {
      return search(path + "/" + elem);
    }
  });
}

function writeJsonFile(pathFile, data) {
  fs.writeFile(
    pathFile, JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    })
}

search(PATH_BASE);

writeJsonFile("C:/Users/luisg/Desktop/Bolsa/search/arquivos.json", obj);

