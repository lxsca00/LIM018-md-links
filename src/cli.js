#!/usr/bin/env node

const mdLinks = require('./index');

const chalk = require('chalk');

const route = process.argv[2];

const options = process.argv;

const polishedPine = chalk.hex('#63a088')

const budGreen = chalk.hex('#7fb069')

const darkMoss = chalk.hex('#3c5a14')

const anotherWhite = chalk.hex('#fffffa')

const helpMessage = `
                      ${budGreen.bold('-ˏˋ. welcome to md-links ˊˎ-')}
                         ${polishedPine('md-links <path> [option]')}
    
  ══════════════════════════════════════════════════════════════════════
                                
                                ${budGreen.bold('OPTIONS')}
    ${polishedPine('without option')}
    use this command to see basic info about links, like href, file 
    and text.
    ${polishedPine('--validate')}
    use this command to see additional info about the status of links
    ${polishedPine('--stats')}
    use this command to see info about stats of links, like total and 
    unique links in a path
    ${polishedPine('--validate --stats or --stats --validate')}
    use this command to see additional info about broken links in a 
    path
    ${polishedPine('--help')}
    use this command to print this info again

  ══════════════════════════════════════════════════════════════════════
`

const validMessage = `
                      ${budGreen.bold('-ˏˋ. welcome to md-links ˊˎ-')}
                    please enter a path to examine.
                   need help? try with ${polishedPine('--help')} command.
`

const statsTable = (res) => console.log(`
                              ${budGreen.bold('-ˏˋ. STATS ˊˎ-')}

  ══════════════════════════════════════════════════════════════════════

    ${polishedPine.bold('Total links : ')} ${res.total}
    ${polishedPine.bold('Unique links : ')} ${res.unique}

  ══════════════════════════════════════════════════════════════════════
`)

const combinateStatsTable = (res) => {
    const uniqueData = new Set(res.map(objLink => objLink.href)).size;
    const brokenData = res.filter(objLink => objLink.message === 'FAIL')
    console.log(`
                              ${budGreen.bold('-ˏˋ. STATS ˊˎ-')}

  ══════════════════════════════════════════════════════════════════════

    ${polishedPine.bold('Total links : ')} ${res.length}
    ${polishedPine.bold('Unique links : ')} ${uniqueData}
    ${polishedPine.bold('Broken links : ')} ${brokenData.length}

  ══════════════════════════════════════════════════════════════════════
`)
}

const validateTable = (res) => {
    console.log(` 
                                 ${budGreen.bold('-ˏˋ. LINKS FOUND ˊˎ-')}

   ═══════════════════════════════════════════════════════════════════════════════════`)
    res.forEach(obj => console.log(`
    ${(obj.text)} -- ${obj.href} 
    ${darkMoss.bold('¡' + obj.message + '!')}
    ${polishedPine('Found in :')} ${obj.file}
    ${polishedPine('Status :')} ${obj.status} 
    `))
    console.log(`   ═══════════════════════════════════════════════════════════════════════════════════`);
}

const noValidateTable = (res) => {
    console.log(` 
                                 ${budGreen.bold('-ˏˋ. LINKS FOUND ˊˎ-')}

   ═══════════════════════════════════════════════════════════════════════════════════`)
    res.forEach(obj => console.log(`
    ${(obj.text)} -- ${obj.href} 
    ${polishedPine('Found in :')} ${obj.file}
    `))
    console.log(`   ═══════════════════════════════════════════════════════════════════════════════════`)
}

const errorTable = (err) => console.log(`
                              ${budGreen.bold('-ˏˋ. LINKS FOUND ˊˎ-')}

   ═══════════════════════════════════════════════════════════════════════════════════

                             ${polishedPine.bold.underline(err.message)}

   ═══════════════════════════════════════════════════════════════════════════════════
`);

switch ((route !== '--validate' || '--stats' || '--help')) {
    case (options.includes('--help')):
        console.log(anotherWhite(helpMessage));
        break;
    case (options.length === 3):
        mdLinks(route, { validate: false })
            .then(res => anotherWhite(noValidateTable(res)))
            .catch(err => errorTable(err))
        break;
    case (options.length === 4):
        if (options.includes('--validate')) {
            mdLinks(route, { validate: true })
                .then(res => anotherWhite(validateTable(res)))
                .catch(err => console.log(err.message))
        } if (options.includes('--stats')) {
            mdLinks(route, { stats: true }).then(res =>
                console.log(anotherWhite(statsTable(res))));
        }
        break;
    case (options.length === 5):
        if (options.includes('--validate') && options.includes('--stats')) {
            mdLinks(route, { validate: true }).then(res =>
                anotherWhite(combinateStatsTable(res)));
        }
        break;
    default:
        console.log(anotherWhite(validMessage));
}