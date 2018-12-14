module.exports = function sliceByColumn(options,originalData) {
    let slicedObject = {}
    for (let option of options) {
        if (option.line.length !== 3) throw Error('请选择正确的截取列下标')
        let arr = []
        for (let rowInfo of originalData) {
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