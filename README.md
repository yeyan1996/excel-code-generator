# excel-code-generator

English | [中文](./README-zh_CN.md)

A tool that can extract specified data from xlsx and generate code into any file

In the dashboard, we often need to enter a lot of field names, manual input will cause a lot of hidden errors

If the data field document is written in Excel, using this tool, users only need to configure the generated code template, you can automatically generate code snippets and write to the specified file, improve work efficiency and reduce errors

## Usage
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

|      Name      |    Type    | Description                                                                | Required |
|:--------------:|:----------:|:---------------------------------------------------------------------------|----------|
| **`template`** | `{string}` | `Generated code template`                                                  | true     |
|  **`target`**  | `{string}` | `Path of the Excel`                                                                         | false    |
|   **`reg`**    | `{RegExp}` | `Use this RegExp to match the specific location of the file to be written` | false    |

excel-code-generator provides a special tag "excel" for template, and the tag template provides some custom syntax to help better fill in Excel values


```javascript
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

Pass an object in `${}` of the following type, and finally generate the following template

Option

|    Paramters    |     Type     | Description                                                                                                                                               | Required |
|:---------------:| :----------: |:----------------------------------------------------------------------------------------------------------------------------------------------------------|----------|
|  **`source`**   |  `{string}`  | `Path of the Excel`                                                                                                                                       | true     |
|   **`line`**    | `{string[]}` | `Read excel's position, the first element is excel's column (English index), and the second and third elements are the column's starting and ending rows` | true     |
| **`camelcase`** | `{boolean}`  | `Whether to convert this field to a hump. The default is true`                                                                                            | false    |

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
