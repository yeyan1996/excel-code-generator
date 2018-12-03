const fs = require("fs");
const xlsx = require("node-xlsx")

const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`C:/Users/007/Desktop/excel.xlsm`));


//下标3为第几张sheet
let {name, data} = workSheetsFromBuffer[3];

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
                return item.replace(/_(\w)/g, function (match) {
                    return match.slice(1, 2).toUpperCase();
                })
            })
        }
        slicedObject[option.name] = slicedItem
    }
    return slicedObject
}


let options = [
    {
        name:"prop",
        line: [3, 4, 7],
        cameCase: true
    },
    {
        name:"label",
        line:[4,4,7],
    }
]
let colObj = sliceByColumn(options)

console.log('截取列表',colObj)

fs.readFile('./tmp_html.vue', 'utf-8', (err, _data) => {
    if (err) {
        console.log(err)
    }

    let arr=_data.match(/([\\s\\S]*?)(<el-table-column[^>]*>)/g);//arr匹配到的是标签的前半部分
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr

    //处理arr每一项的v-model
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].replace(/prop="\w+"/g,`prop="${colObj.prop[i]}"`)
        arr[i] = arr[i].replace(/label="([\u4e00-\u9fa5]|\w)+"/g, `label="${colObj.label[i]}"`)
    }

    let index = 0;//储存上一次的end位置
    //从各个匹配的位置替换原来标签
    for (let i = 0; i < sourceArr.length; i++) {
        let start=_data.indexOf(sourceArr[i],index);
        let len=sourceArr[i].length
        let end=start+len;
        _data=_data.substring(0,start-1)+arr[i]+_data.substring(end,_data.length);
        index=end;
    }

    //写入一个新的文件里，当然也可以覆盖原来的文件
    fs.writeFile('./tmp_html.vue',_data, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
})