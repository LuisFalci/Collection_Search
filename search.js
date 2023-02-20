const fs = require("fs");

// URL do diertório a ser lido
const PATH_BASE = "D:/HD Giovanni/AHJF_FCMI-2015";

// objeto que irá guardar os arquivos retornados
let obj = [];

// função para percorrer todas as pastas e subpastas do diretório especificado
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

//Função para escrita do objeto gerado em um arquivo json  
function writeJsonFile(pathFile, data) {
  fs.writeFile(
    pathFile, JSON.stringify(data), (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    })
}

//Diretório a ser lido
search(PATH_BASE);

//Local, nome e extensão do arquivo escrito / o que será escrito
writeJsonFile("D:/Programação/Projetos Pessoais/Filepaths Acervo/filepaths.json", obj);

