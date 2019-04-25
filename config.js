module.exports = {
    // path:'C:/Users/007/Desktop/excel.xlsm',
    path: 'C:/Users/zhl/Desktop/excel.xlsm',
    sheet: 1,
    options: [
        {
            name: "prop",
            //第1个参数为第x列
            //第2个参数为第x行
            //第3个参数为提取到x列(以excel的顶部为第一列)
            line: [3, 4, 56],
            // 是否需要转成驼峰
            cameCase: true
        },
        {
            name: "label",
            line: [4, 4, 56],
        }
    ],
    readFilePath: 'E:/HospitalManagement/dp2plus/src/views/hospCatalogSearch/detailColumns.ts',
    writeFilePath: 'E:/HospitalManagement/dp2plus/src/views/hospCatalogSearch/detailColumns.ts'
}