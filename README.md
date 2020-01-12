# excel-code-generator

> 一个能够读取 excel 文件的指定单元格并生成指定代码到文件中的工具

在后台管理系统中，往往需要输入很多字段名，手动输入会造成很多隐藏的错误

`如果数据字段的文档是用 excel 写的话`，使用这款工具，用户只需配置生成的代码的模版，即可自动生成代码片段并写入指定文件中，提高工作效率，减少误差

## 使用

```
npm i excel-code-generator -D
```

```javascript
const { gen, excel } = require("excel-code-generator");

gen({
  target: "./example/index.vue",
  reg: /table>/g,
  template: excel`
     <el-table-column
        prop="${{
          source: "./example/excel.xlsx",
          line: ["H", 1, 5]
        }}"
        label="${{
          source: "./example/excel.xlsx",
          line: ["I", 1, 5]
        }}"
        width="180">
      </el-table-column>
    `
});
```

## Api

|      Name      |    类型    | Description          | 是否必填 |
| :------------: | :--------: | :------------------- | -------- |
| **`template`** | `{string}` | `生成的代码模版`     | 是       |
|  **`target`**  | `{string}` | `写入文件路径`       | 否       |
|   **`reg`**    | `{RegExp}` | `写入文件的具体位置` | 否       |

其中 excel-code-generator 为 template 提供了特殊的标签模版 `excel`，标签模版提供了一些自定义语法帮助更好的填入 excel 的值

```
excel`
     <el-table-column
        prop="${{
          source: "./example/excel.xlsx",
          line: ["H", 1, 5]
        }}"
        label="${{
          source: "./example/excel.xlsx",
          line: ["I", 1, 5]
        }}"
        width="180">
      </el-table-column>
    `
```

在 `${}` 中传入一个对象，类型如下，最后生成以下模版

Option

|      参数       |     Type     | Description                                                                          | 是否必填 |
| :-------------: | :----------: | :----------------------------------------------------------------------------------- | -------- |
|  **`source`**   |  `{string}`  | `读取的 excel 路径`                                                                  | 是       |
|   **`line`**    | `{string[]}` | `读取 Excel 的位置，第一个元素为 Excel 的列（英文索引），第二，三个元素为列的起止行` | 是       |
| **`camelcase`** | `{boolean}`  | `是否将该字段转为驼峰，默认 true`                                                    | 否       |

```vue
<el-table-column prop="I1" label="H1" width="180">
  </el-table-column>

<el-table-column prop="I2" label="H2" width="180">
  </el-table-column>

<el-table-column prop="I3" label="H3" width="180">
  </el-table-column>

<el-table-column prop="I4" label="H4" width="180">
  </el-table-column>

<el-table-column prop="I5" label="H5" width="180">
  </el-table-column>
```
