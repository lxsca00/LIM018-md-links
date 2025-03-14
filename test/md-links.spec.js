const mdLinks = require('../src/index.js');

const axios = require('axios')

const main = require('../src/main.js')

jest.mock('axios')

const response = [
  {
    href: 'https://es.wikipedia.org/wiki/Markdown',
    file: 'C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md',
    text: 'Markdown'
  },
  {
    href: 'https://es.wikipedia.org/wiki/Markdwn',
    file: 'C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md',
    text: 'Link roto'
  },
];

/* FUNCIÓN MDLINKS */

describe('mdLinks', () => {
  it('should be an error message if something is wrong', () => {
    mdLinks('test', { validate: false })
      .catch(err => expect(err.message).toBe('error: no .md files found'))
    mdLinks('hola', { validate: false })
      .catch(err => expect(err.message).toBe('error: path not found'))
  });
  it('should return an array with href, file and text if !validate', () => {
    mdLinks('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md', { validate: false })
      .then(res => expect(res).toStrictEqual(response))
  })
  it('should return an array with total and unique links', () => {
    mdLinks('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md', { stats: true })
      .then(res => expect(res).toStrictEqual({ total: 2, unique: 2 }))
  })
});

/* TEST UNITARIOS */

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
    expect(typeof someText).toBe('string')
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
    expect(withDirectory.length).toBe(4)
    const without = main.getFiles('test')
    expect(without.length).toBe(0)
  })
})

const someText = main.readFiles('C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md');
const arrObj = main.getLinks(someText, 'C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md');

describe('getLinks()', () => {
  it('should return an array of objets', () => {
    expect(typeof arrObj).toBe('object');
    expect(typeof arrObj[0]).toBe('object');
  })
  it('should return an array of objects with href, text and file keys', () => {
    expect(arrObj).toStrictEqual(response)
  })
})

describe('validateLinks()', () => {
  it('should return an array with objects once resolved', () => {
    const res = [{
      href: 'https://es.wikipedia.org/wiki/Markdown',
      file: 'C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md',
      text: 'Markdown',
      status: 200,
      message: 'OK'
    },
    {
      href: 'https://es.wikipedia.org/wiki/Markdwn',
      file: 'C:\\Users\\ljime\\LIM018\\LIM018-md-links\\example\\prueba.md',
      text: 'Link roto',
      status: 404,
      message: 'FAIL'
    },
    ]
    axios.get.mockResolvedValueOnce({ status: 200, message: 'OK' })
    axios.get.mockRejectedValue(
      {
        response: {
          status: 404
        },
        message: 'FAIL'
      }
    )
    const allLinkRequestsPromises = main.validateLinks(arrObj);
    Promise.all(allLinkRequestsPromises)
      .then(something =>
        expect(something).toStrictEqual(res))
  })
})

describe('pathStats()', () => {
  it('should return an object with info', () => {
    const pathData = main.pathStats(arrObj);
    expect(pathData).toStrictEqual({ total: 2, unique: 2 })
  })
})