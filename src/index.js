// exportar una función mdLinks
const main = require('./main.js')

const route = process.argv[2]

module.exports = mdLinks = (route, options = {validate: false}) => {
  return new Promise((resolve, reject) => {
    if(!main.pathExists(route)){
      reject(new Error('error: path not found'))
    }

    const arrMd = main.getFiles(route);

    if(arrMd === null){
      reject(new Error('error: no .md files found'))
    }

    const objLinks = arrMd.map( route => {
      const fileCont = main.readFiles(route)
      return main.getLinks(fileCont, route) // Arrays de objetos de links de un file, contiene irl, ruta y texto, 1 array por file
    })

    const arrLinks = objLinks.flat()

    if(arrLinks === null) {
      reject(new Error('error: no links found'))
    }
    
    if(options.validate === false){
      resolve(arrLinks)
    }

    if(options.validate === true){
      const allLinkRequestsPromises = main.validateLinks(arrLinks); // Array de promesas
      Promise.all(allLinkRequestsPromises)
        .then( (res) => resolve(res)) // Arroja las promesas resueltas
    }
    
    if(options.stats === true){
      resolve(main.pathStats(arrLinks))
    }

  })
}

mdLinks(route).then(console.log)