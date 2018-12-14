module.exports = function replaceFormItem(initCode, excelObj) {
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