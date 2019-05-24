# excel-code-generator
> 一个能够读取 excel 文件的指定单元格并生成指定代码到文件中的工具

在后台管理系统中，往往需要输入很多字段名，手动输入会造成很多隐藏的错误，使用这款工具，用户只需配置生成的代码的模版以及读取 excel 的位置，即可自动生成代码片段并写入指定文件中，提高工作效率，减少误差

## Api
|Name|Type|Description|
|:--:|:--:|:----------|
|**`excelPath`**|`{String}`|`读取 excel 文件的路径`
|**`targetPath`**|`{String}`|`目标路径，支持相对（config.ts）/绝对路径`
|**`sheet`**|`{Number}`|`读取第几页的sheet`
|**`reg`**|`{RegExp}`|`写入文件的具体位置`
|**`options`**|`{Options[]}`|`配置项`
|**`template`**|`{String}`|`生成的代码模版`

* Options

|Name|Type|Description|
|:--:|:--:|:----------|
|**`as`**|`{String}`|`字段名，需要和代码模版中的插值表达式关联`
|**`line`**|`{String[]}`|`读取 Excel 的位置，第一元素为 Excel 的列（英文索引），第二个元素为第几行到第几行`
|**`camelCase`**|`{Boolean}`|`是否将该字段转为驼峰`


在代码模版中，借鉴了 Vue 的插值表达式，将 `{{}}` 中的字段和 options 中的 as 关联，读取到数据后，会根据 as 中的值写入到 `{{}}`中，同时在插值表达式内使用 `_index` 可以获得下标

## Install
```
git clone git@github.com:yeyan1996/excel-code-generator.git
```


## Usage

1. 终端运行 `npm i`
2. 配置 src/config.ts
3. 终端运行 `npm run start`


