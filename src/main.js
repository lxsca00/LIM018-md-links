const fs = require('fs');

const path = require('path');

const axios = require('axios');

/* ¿LA RUTA ES ABSOLUTA? */
const absoluteOrNot = (pathInput) => path.isAbsolute(pathInput) ? pathInput : path.resolve(pathInput) // Respecto a la carpeta LIM018-md-links

/* ¿LA RUTA EXISTE? */
const pathExists = (pathInput) => fs.existsSync(pathInput)

/* ¿CUÁL ES LA EXTENSIÓN DEL ARCHIVO? */
const isMd = (pathInput) => (path.extname(pathInput) === '.md')

/* LEER DOCUMENTOS */
const readFiles = (pathInput) => fs.readFileSync(pathInput, 'utf8')

/* ¿ES DOCUMENT0? */
const isDoc = (pathInput) => {
  const filePath = fs.statSync(pathInput)
  return filePath.isFile()
}

/* OBTENER TODOS LOS .MD FILES */
const getFiles = (pathInput) => {
  const newRoute = absoluteOrNot(pathInput);
  let mdFiles = [];
  if (isDoc(newRoute)) {
    if (isMd(newRoute)) {
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

// Recibe el contenido del path y el path
const getLinks = (fileContent, onePath) => {
  const http = /(\[(.*?)\])?\(http(.*?)\)/gm;
  const linksInMd = fileContent.match(http);
  if (linksInMd !== null) {
    return linksInMd.map(link => {
      const firstofLink = link.indexOf('(')
      const lastOfText = link.indexOf(']')
      return {
        href: link.slice(firstofLink + 1, -1),
        file: onePath,
        text: link.slice(1, lastOfText),
      }
    })
  }
} // Retorna un array de objetos con la info de los links


const validateLinks = (arrLinks) => {
  const arrPromises = arrLinks.map((objLink) => {
    const link = objLink.href;
    return axios.get(link)
      .then((res) => {
        objLink.status = res.status,
          objLink.message = 'OK';
        return objLink;
      })
      .catch((err) => {
        objLink.status = err.response.status,
          objLink.message = 'FAIL';
        return objLink
      })
  })
  return arrPromises
}

/* OBTIENE STATS RESPECTO A LOS LINKS DE LA RUTA*/
const pathStats = (arrLinks) => { // Recibe el array de links del path ingresado
  const totalLinks = arrLinks.length;
  const uniqueData = new Set(arrLinks.map(objLink => objLink.href)).size;
  return {
    total: totalLinks,
    unique: uniqueData,
  }
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
  pathStats,
}