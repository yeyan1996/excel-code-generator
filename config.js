module.exports = {
    // path:'C:/Users/007/Desktop/excel.xlsm',
    path: 'C:/Users/zhl/Desktop/excel.xlsm',
    sheet: 1,
    options: [
        {
            name: "prop",
            //第1个参数为第x列(excel表格的列数的英文字母)
            //第2个参数为第x行
            //第3个参数为提取到x列(以excel的顶部为第一列)
            line: ["d", 24, 37],
            // 是否需要转成驼峰
            cameCase: true
        },
        {
            name: "label",
            line: ["c", 24, 37],
        }
    ],
    readFilePath: 'E:/HospitalManagement/dp2plus/src/views/payReview/columns.ts',
}
