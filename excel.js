const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"));
const xlsx = require("node-xlsx")
const config = require('./config')
const sliceByColumn = require('./sliceByColumn')
const replaceFormItem = require('./replaceFormItem')
const generatorTableColumn = require('./generatorTableColumn')

let workSheetsFromBuffer = xlsx.parse(fs.readFileSync(config.path));
//第几张sheet
let {data} = workSheetsFromBuffer[config.sheet - 1];

async function readFile() {
    let readData = await fs.readFileAsync(config.readFilePath, 'utf-8')
    console.log('read success!')
    return readData
}

async function writeFile(writeData) {
    await fs.writeFileAsync(config.writeFilePath, writeData)
    console.log('write success!')
}

let colObj = sliceByColumn(config.options, data)

console.log(colObj)

readFile()
    .then(readData => {
        let replacedCode = generatorTableColumn(readData, colObj)
        writeFile(replacedCode)
    })
    .catch(err => console.log(err))
