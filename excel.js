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

function replaceFormItem(initCode, excelObj) {
    let arr = initCode.match(/<el-form-item[^>]*>[\s\S]*?<\/el-form-item>/g);//arr匹配到的是标签的前半部分
    // console.log(arr)
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr
    let index = 0;//储存上一次的end位置

    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/v-model="[^"]*"/g,`v-model="${excelObj.prop[i]}"`)
        arr[i] = arr[i].replace(/label="([\u4e00-\u9fa5]|\w)+"/g, function(match,index){
            if(index === '0') return `label="${colObj.label[i]}"`
            return match
        })
    }

    //从各个匹配的位置替换原来标签
    for (let i = 0; i < sourceArr.length; i++) {
        let start=initCode.indexOf(sourceArr[i],index);
        let len=sourceArr[i].length
        let end=start+len;
        initCode=initCode.substring(0,start-1)+arr[i]+initCode.substring(end,initCode.length);
        index=end;
    }

    console.log(initCode)
    return initCode
}


function replaceCode(initCode, excelObj) {
    let arr = initCode.match(/([\\s\S]*?)(<el-table[^>]*>)/g);//arr匹配到的是标签的前半部分
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr
    let str = ""
    for (let i = 0; i < colObj.label.length; i++) {
        str += `\n 
                <el-table-column
                 width="160"
                 prop="${colObj.prop[i]}" 
                 label="${colObj.label[i]}">
                </el-table-column>`
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
console.log(colObj)

readFile()
    .then(readData => {
        let replacedCode = replaceCode(readData, colObj)
        writeFile(replacedCode)
    })
    .catch(err => console.log(err))


