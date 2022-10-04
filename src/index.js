const main = require('./main.js')

module.exports = mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    if (!main.pathExists(route)) {
      reject(new Error('error: path not found'))
    }

    const arrMd = main.getFiles(route);

    if (arrMd.length === 0) {
      reject(new Error('error: no .md files found'))
    }

    const objLinks = arrMd.map(route => {
      const fileCont = main.readFiles(route);
      return main.getLinks(fileCont, route);
    })

    const arrLinks = (objLinks.flat()).filter(obj => obj !== null)

    if (arrLinks.length === 0) {
      reject(new Error('error: no links found'))
    }

    if (options.validate) {
      const allLinkRequestsPromises = main.validateLinks(arrLinks);
      Promise.all(allLinkRequestsPromises)
        .then((res) => resolve(res))
    } if (options.stats) {
      resolve(main.pathStats(arrLinks))
    } if (!options.validate) {
      resolve(arrLinks)
    }
  })
}