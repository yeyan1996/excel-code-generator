// 提取Excel字段在Columns.ts生成Columns数组

module.exports = function generatorColumns(initCode, excelObj) {
    if (!initCode.match(/columns([^\[]+\[)+/g)) throw new Error('没有匹配到相应字段,请查看格式');
    let matchStr = initCode.match(/columns([^\[]+\[)+/g)[0];//arr匹配到的是标签的前半部分
    let str = ""
    for (let i = 0; i < excelObj.label.length; i++) {
        if (i === excelObj.label.length - 1) {
            str += `
    {
        attrs: {label: "${excelObj.label[i]}", prop: "${excelObj.prop[i]}", width: '150'},
    }
    `
            break;
        }
        str += `
    {
        attrs: {label: "${excelObj.label[i]}", prop: "${excelObj.prop[i]}", width: '150'},
    }, `
    }
    ////从各个匹配的位置替换原来标签
    let openTagStart = initCode.indexOf(matchStr);
    let openTagLen = matchStr.length
    let openTagEnd = openTagStart + openTagLen;
    return initCode.substring(0, openTagEnd) + str + initCode.substring(openTagEnd);
}