// exportar una función mdLinks

const fs = require('fs');

const path = require('path');

const route = process.argv[2]

module.exports = mdLinks = (route, options = { validate: false }) => {
  // ...
  path.isAbsolute(route)?console.log(route):console.log(path.join(__dirname, route)) // Respecto a la carpeta LIM018-md-links
  
  fs.existsSync(route)?console.log('this path exists'):console.log('error: path not found') // revisar .access
  
  fs.stat(route, (err, stats) => {
    if (err) throw err;
    else {
      if(stats.isFile()){
        console.log('is file');
          if (path.extname(route) === '.md') {
            console.log('is a .md file')
            fs.readFile(route, 'utf8', function(err, data){
              if(err) throw err;
              console.log(data)
            })
          } else {
            console.log('error: .md file not found')
          }
      } if (stats.isDirectory()){
        console.log('is directory')
        fs.readdir(route, (err, files) => {
          if(err) throw err;
          const mdFiles = files.filter( file => path.extname(file) === '.md');
          mdFiles.forEach(file => {
            console.log(file);
            const newPath = path.join(__dirname, route, file)
            fs.readFile(newPath, 'utf8', function(err, data){
              if(err) throw err;
              console.log(data)
            })
          })
          if (mdFiles.length == 0) { console.log('no .md file in this directory')}
        })
      }
    }
  })
};

mdLinks(route)
// return new Promise (resolve, reject)

// console.log(__filename, __dirname);

// console.log(path.isAbsolute('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\index.js')) // Metodo para saber si el path es absoluto

/* myDateTime = function () {
  return Date();
};

console.log(module)*/