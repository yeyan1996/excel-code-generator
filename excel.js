const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"));
const xlsx = require("node-xlsx")
const config = require('./config')
const sliceByColumn = require('./sliceByColumn')
const replaceFormItem = require('./replaceFormItem')
const generatorTableColumn = require('./generateTableColumn')
const generatorColumnsData = require('./generateColumnsData')
console.log(process.argv[2])
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
        let replacedCode;
        switch (process.argv[2]) {
            case 'generateTableColumn':
                replacedCode = generatorTableColumn(readData, colObj)
                break;
            case 'generateColumnsData':
                replacedCode = generatorColumnsData(readData, colObj)
                break;
            case 'replaceFormItem':
                replacedCode = replaceFormItem(readData, colObj)
                break;
            default:
                replacedCode = generatorColumnsData(readData, colObj)
        }
        writeFile(replacedCode)
    })
    .catch(err => console.log(err))
