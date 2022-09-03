const fs = require('fs');

const path = require('path');

// ¿LA RUTA ES ABSOLUTA?
const absoluteOrNot = (pathInput) => path.isAbsolute(pathInput)?pathInput:path.resolve(pathInput) // Respecto a la carpeta LIM018-md-links

// ¿LA RUTA EXISTE?
const pathExists = (pathInput) => fs.existsSync(pathInput)?console.log('this path exists'):console.log('error: path not found') // revisar .access

// ¿CUÁL ES LA EXTENSIÓN DEL ARCHIVO?
const isMd = (pathInput) => (path.extname(pathInput) === '.md')

// LEER DOCUMENTOS
const readFiles = (pathInput) => fs.readFile(pathInput, 'utf8', (err, data) => {if(err) throw err; console.log(data)}) // NOTA: Lee relative pero no absolute

// ¿ES DOCUMENT0?
const isDoc = (pathInput) => {
  const filePath = fs.statSync(pathInput);
  return filePath.isFile()
}

// OBTENER TODOS LOS .MD FILES
const getFiles = (pathInput) => {
  const newRoute = absoluteOrNot(pathInput);
  let mdFiles = [];
    if (isDoc(newRoute)){
      if(isMd(newRoute)){
        mdFiles.push(newRoute)
      }
    } else {
      const directory = fs.readdirSync(newRoute);
      directory.forEach(file => {
        const directoryRoute = path.join(newRoute, file)
        mdFiles = mdFiles.concat(getFiles(directoryRoute))
      })
    }
  // if (mdFiles.length === 0) console.log('no .md files found')
  return mdFiles
}

module.exports = {
    absoluteOrNot,
    pathExists,
    isMd,
    readFiles,
    isDoc,
    getFiles,
}

console.log(module.exports)