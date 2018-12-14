const Promise = require('bluebird')
const fs = Promise.promisifyAll(require("fs"));
const xlsx = require("node-xlsx")
const config = require('./config')

let workSheetsFromBuffer = xlsx.parse(fs.readFileSync(config.path));
//第几张sheet
let {data} = workSheetsFromBuffer[config.sheet - 1];

function sliceByColumn(options) {
    let slicedObject = {}
    for (let option of options) {
        if (option.line.length !== 3) throw Error('请选择正确的截取列下标')
        let arr = []
        for (let rowInfo of data) {
            arr.push(rowInfo[option.line[0] - 2])
        }
        let slicedItem = arr.slice(option.line[1] - 1, option.line[2])
        if (option.cameCase) {
            slicedItem = slicedItem.map(item => {
                return item.toLowerCase().replace(/_(\w)/g, function (match) {
                    return match.slice(1, 2).toUpperCase();
                })
            })
        }
        slicedObject[option.name] = slicedItem
    }
    return slicedObject
}


function replaceCode(initCode, colObj) {
    console.log('截取列表', colObj)
    let arr = initCode.match(/([\\s\S]*?)(<el-table[^>]*>)/g);//arr匹配到的是标签的前半部分
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr
    let str = ""
    for (let i = 0; i < colObj.label.length; i++) {
        str += `\n <el-table-column width="160" prop="${colObj.prop[i]}" label="${colObj.label[i]}"></el-table-column> \n`
    }
    ////从各个匹配的位置替换原来标签
    let openTagStart = initCode.indexOf(sourceArr[0]);
    let openTagLen = sourceArr[0].length
    let openTagEnd = openTagStart + openTagLen;
    let replacedCode = initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd);
    return replacedCode
}

async function readFile() {
    let readData = await fs.readFileAsync(config.readFilePath, 'utf-8')
    console.log('read success!')
    return readData
}

async function writeFile(writeData) {
    await fs.writeFileAsync(config.writeFilePath, writeData)
    console.log('write success!')
}

let colObj = sliceByColumn(config.options)

readFile()
    .then(readData => {
        let replacedCode = replaceCode(readData, colObj)
        writeFile(replacedCode)
    })
    .catch(err => console.log(err))


