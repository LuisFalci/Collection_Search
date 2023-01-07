const fs = require("fs");
const readline = require("readline");
const path =
  "C:/Users/luisg/Desktop/Bolsa/Scripts/ReadLine/ISCMI_REVISADO.content.txt";
let serie = [];
let age = [];

readInventoryLines(path);

setTimeout(() => {
  writeJsonFile(
    "C:/Users/luisg/Desktop/Bolsa/Scripts/ReadLine/Json/arquivos.json",
    serie
  );
}, 10000);

//------------------------Funções Principais-----------------
async function readInventoryLines(path) {
  let read = readline.createInterface({
    input: fs.createReadStream(path),
  });

  let descTemp;
  let ageTemp;
  let serieTemp;

  read.on("line", (text) => {
    if (
      text.includes("CORRESPONDÊNCIA") ||
      text.includes("CORRESPONDENCIA") ||
      text.includes("DOCUMENTOS") ||
      text.includes("EDITAIS") ||
      text.includes("PROCURAÇÕES") ||
      text.includes("MAPAS") ||
      text.includes("REQUERIMENTOS") ||
      text.includes("LIVRO") ||
      text.includes("RECIBOS") ||
      text.includes("INDICAÇÕES") ||
      text.includes("PROPOSTAS") ||
      text.includes("ATAS") ||
      text.includes("CARTAS") ||
      text.includes("CORESPONDÊNCIA") ||
      text.includes("RELATÓRIOS") ||
      text.includes("DOCUMETOS") ||
      text.includes("CONVOCAÇÕES")
    ) {
      serieTemp = text;
      // serie.push({ Serie: text });
    }
    else if(text.includes("18") && text.includes("-") && text.includes("ítens")) {
      ageTemp = text;
      serie.push({ Serie: serieTemp, Desc: descTemp, Age: ageTemp });
      descTemp = "";
    } else {
      descTemp = descTemp + text;
    }
  });
}

function writeJsonFile(pathFile, data) {
  fs.writeFile(pathFile, JSON.stringify(data), (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
}
