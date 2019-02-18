module.exports = function sliceByColumn(options,originalData) {
    let map = Array.from(new Array(26)).map((item,index)=>(String.fromCharCode(index+97)))
    let slicedObject = {}
    for (let option of options) {
        if (option.line.length !== 3) throw Error('请选择正确的截取列下标')
        let arr = []
        for (let rowInfo of originalData) {
            let index = map.findIndex(item=>item === option.line[0].toLowerCase())
            arr.push(rowInfo[index])
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