const mdLinks = require('../');
const main = require('../main.js')


/* describe('mdLinks', () => {

  it('should...', () => {
    console.log('FIX ME!');
  });

}); */

// TEST UNITARIOS

describe('absoluteOrNot()', () => {
  it('should return an absolute path from relative', () => {
    const relativePath = main.absoluteOrNot('example');
    expect(relativePath).toBe('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example')
  })
  it('should return an absolute path', () => {
    const absolutePath = main.absoluteOrNot('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\README.md')
    expect(absolutePath).toBe('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\README.md')
  })
})

describe('pathExist()', () => {
  it('should return true if path exists', () => {
    const somePath = main.pathExists('example')
    expect(somePath).toBe(true)
  })
  it('should return false if path does not exist', () => {
    const somePath = main.pathExists('node')
    expect(somePath).toBe(false)
  })
})

describe('isMd()', () => {
  it('should return true if is a .md file', () => {
    const anMdFile = main.isMd('README.md')
    expect(anMdFile).toBe(true)
  })
  it('should return false if is not a .md file', () => {
    const notAnMdFile = main.isMd('example')
    expect(notAnMdFile).toBe(false)
  })
})

describe('readFiles()', () => {
  it('should return a string', () => {
    const someText = main.readFiles('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md')
    expect( typeof someText).toBe('string')
  })
})

describe('isDoc()', () => {
  it('should return true if path is a file', () => {
    const onePath = main.isDoc('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\README.md')
    expect(onePath).toBe(true)
  })
  it('should return false if path is a directory', () => {
    const onePath = main.isDoc('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example')
    expect(onePath).toBe(false)
  })
})

describe('getFiles()', () => {
  it('should return an array with all the .md files in path', () => {
    const withFile = main.getFiles('README.md')
    expect(withFile.length).toBe(1)
    const withDirectory = main.getFiles('example')
    console.log(withDirectory)
    expect(withDirectory.length).toBe(3)
    const without = main.getFiles('test')
    expect(without.length).toBe(0)
  })
})