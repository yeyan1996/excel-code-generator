module.exports = function generatorTableColumn(initCode, excelObj) {
    if (!initCode.match(/<el-table[^>]*>/g)) throw new Error('没有匹配到相应字段,请查看格式');
    let arr = initCode.match(/<el-table[^>]*>/g);//arr匹配到的是标签的前半部分
    let sourceArr = JSON.parse(JSON.stringify(arr));// 深拷贝arr
    let str = ""
    for (let i = 0; i < excelObj.label.length; i++) {
        str += `
                <el-table-column
                 width="160"
                 prop="${excelObj.prop[i]}" 
                 label="${excelObj.label[i]}">
                </el-table-column>`
    }
    ////从各个匹配的位置替换原来标签
    let openTagStart = initCode.indexOf(sourceArr[0]);
    let openTagLen = sourceArr[0].length
    let openTagEnd = openTagStart + openTagLen;
    return  initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd);
}