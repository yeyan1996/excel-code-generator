const fs = require("fs");
const xlsx = require("node-xlsx")
const config = require('./config')
let workSheetsFromBuffer = xlsx.parse(fs.readFileSync(config.path));

//第几张sheet
let {data} = workSheetsFromBuffer[config.sheet-1];

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


let colObj = sliceByColumn(config.options)

console.log('截取列表', colObj)

fs.readFile(config.readFilePath, 'utf-8', (err, _data) => {
    if (err) console.log(err)

    let arr = _data.match(/([\\s\S]*?)(<el-table[^>]*>)/g);//arr匹配到的是标签的前半部分
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr
    let str = ""
    //处理arr每一项的v-model
    for (let i = 0; i < colObj.label.length; i++) {
        str += `\n <el-table-column width="160" prop="${colObj.prop[i]}" label="${colObj.label[i]}"></el-table-column> \n`
    }

    ////从各个匹配的位置替换原来标签
    let openTagStart = _data.indexOf(sourceArr[0]);
    let openTagLen = sourceArr[0].length
    let openTagEnd = openTagStart + openTagLen;
    _data = _data.substring(0, openTagEnd) + str + _data.substring(openTagEnd);


    //写入一个新的文件里，当然也可以覆盖原来的文件
    fs.writeFile(config.writeFilePath, _data, (err) => {
        if (!!err) throw err;
        console.log('The file has been saved!');
    });
})