// exportar una función mdLinks
const main = require('./main.js')

const route = process.argv[2]

// 01-09 TO-DO
// - Desenmarañar en funciones la bola de abajo
// - Leer links dentro de un file
// - Revisar asincronia
// - Revisar RegEx
// - Testear lo que ya hay

// 1. LEER DOCUMENTO
// 2. RETORNAR LINKS (Hacerle push a un array de todos los links de la ruta)
// 3. CONTAR LOS LINKS TOTALES

module.exports = mdLinks = (route, options = { validate: false }) => {
  // ...

  main.pathExists(route)

  console.log(main.getFiles(route))
  
  /* fs.stat(route, (err, stats) => {
    let mdFiles = [];
    // console.log(stats)
    if (err) throw err;
    else {
      if(stats.isFile()){
        console.log('is file');
          if (isMd(route)) {
            console.log('is a .md file')
            readFiles(route)
          } else {
            console.log('error: .md file not found')
          }
      } if (stats.isDirectory()){
        console.log('is directory')
        fs.readdir(route, (err, files) => {
          if(err) throw err;
          console.log(files)
          // si dentro del directorio hay otro directorio, 'file' será un paramentro para añadirse al rastrear la ruta hasta el file.md
          // OBTENER LOS FILES .MD DE UN DIRECTORIO
          const directoryMdFiles = files.filter(file => isMd(file));
          directoryMdFiles.forEach(file => {
            const newPath = path.join(__dirname, route, file) // Aquí está el problema de que no lee absolutes, revisar .resolve
            readFiles(newPath)
          })
          // HASTA AQUÍ
          if (directoryMdFiles.length == 0) { console.log('no .md file in this directory')}
          console.log(directoryMdFiles)
        })
      }
    }
  }) */
};

mdLinks(route)
// return new Promise (resolve, reject)

/* myDateTime = function () {
  return Date();
};

console.log(module)*/