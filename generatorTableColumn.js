module.exports = function generatorTableColumn(initCode, colObj) {
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