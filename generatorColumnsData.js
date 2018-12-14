module.exports = function generatorTableColumn(initCode, excelObj) {
    if (!initCode.match(/columns.*]/g)) throw new Error('没有匹配到相应字段,请查看格式');
    let columnArray = initCode.match(/columns.*]/g)[0]
    let sourceArr = JSON.parse(JSON.stringify(columnArray));// 深拷贝arr
    let str = "columns: ["
    for (let i = 0; i < excelObj.label.length; i++) {
        str += `
                    {label: "${excelObj.label[i]}", prop: "${excelObj.prop[i]}"},`
        if (i === excelObj.label.length - 1) str += `
                ]`
    }
    ////从各个匹配的位置替换原来标签
    let openTagStart = initCode.indexOf(sourceArr);
    let openTagLen = sourceArr.length
    let openTagEnd = openTagStart + openTagLen;
    return initCode.substring(0, openTagStart) + str + initCode.substring(openTagEnd);
}