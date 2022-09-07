const fs = require('fs');

const path = require('path');

// const marked = require('marked');

// const cheerio = require('cheerio');

const axios = require('axios');

// ¿LA RUTA ES ABSOLUTA?
const absoluteOrNot = (pathInput) => path.isAbsolute(pathInput)?pathInput:path.resolve(pathInput) // Respecto a la carpeta LIM018-md-links

// ¿LA RUTA EXISTE?
const pathExists = (pathInput) => fs.existsSync(pathInput)// ?console.log('this path exists'):console.log('error: path not found') // revisar .access

// ¿CUÁL ES LA EXTENSIÓN DEL ARCHIVO?
const isMd = (pathInput) => (path.extname(pathInput) === '.md')

// LEER DOCUMENTOS
const readFiles = (pathInput) => fs.readFileSync(pathInput, 'utf8') // NOTA: Lee relative pero no absolute

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
  return mdFiles
}

// OBTIENE LOS LINKS Y SU INFORMACIÓN A PARTIR DE LA RUTA DE UN FILE
const getLinks = (onePath) => { // En base a una sola ruta
  const http = /http?([^\)]*)/gm;
  const link = readFiles(onePath).match(http);
  // console.log(new marked.Renderer())
  // Agregar el si es distinto a null
  const arrObj = link.map( oneLink => {
    return { 
      href: oneLink,
      file: onePath,
      text: 'help' }
  })

  return arrObj
} // Retorna array de objetos de la info de los links

// PETICION HTTP PARA VALIDAR LINKS
const validateLinks = (arrLinks) => {
 const a = arrLinks.map( link => {
  const url = link.href;
    console.log(url)
    axios.get(url)
      .then( response => console.log({ ...link, status : response.status, message: response.statusText }))
      .catch( err => (err.response)?console.log({ ...link, status: err.response.status, message: 'FAIL' }):console.log('no response') )
  })
  // return Promise.all(promises)
  return a
}


module.exports = {
    absoluteOrNot,
    pathExists,
    isMd,
    readFiles,
    isDoc,
    getFiles,
    getLinks,
    validateLinks,
}