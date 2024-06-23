export default {
  dbName: "DiandiApp",
  version: new Date(),
  tables: [
    {
      tableName: "mainData",//进度
      option: {keyPath: "id"},
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "iconId"//iconId
        },
        {
          key: "themeColor"//主题颜色
        },
        {
          key: "title" //标题
        },
        {
          key: "describe"//描述
        },
        {
          key: "madeTime" //制作时间
        },
        {
          key: "finishList"//完成列表
        },
        {
          key: "tableType"
        },
        {
          key: "data"
        },
        {
          key: "box"//收集箱
        },
        {
          key: "needInFile"//完成后是否需要归档
        },
        {
          key: "needRecord"//操作后是否需要记录想法
        },
        {
          key: "recordList"//记录列表
        },
        {
          key: "needFrame"//是否需要弹窗
        },
      ]
    },
    {
      tableName: "inFile",//归档
      option: {keyPath: "id"},
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "iconId"//iconId
        },
        {
          key: "themeColor"//主题颜色
        },
        {
          key: "title" //标题
        },
        {
          key: "describe"//描述
        },
        {
          key: "madeTime" //制作时间
        },
        {
          key: "finishList"//完成列表
        },
        {
          key: "tableType"
        },
        {
          key: "data"
        },
        {
          key: "box"//收集箱
        },
        {
          key: "needInFile"//完成后是否需要归档
        },
        {
          key: "needRecord"//操作后是否需要记录想法
        },
        {
          key: "recordList"//记录列表
        },
        {
          key: "needFrame"//是否需要弹窗
        },
      ]
    },
    {
      tableName: "deleteList",//归档
      option: {keyPath: "id"},
      indexs: [
        {
          key: "id",
          option: {
            unique: true
          }
        },
        {
          key: "iconId"//iconId
        },
        {
          key: "themeColor"//主题颜色
        },
        {
          key: "title" //标题
        },
        {
          key: "describe"//描述
        },
        {
          key: "madeTime" //制作时间
        },
        {
          key: "finishList"//完成列表
        },
        {
          key: "tableType"
        },
        {
          key: "data"
        },
        {
          key: "box"//收集箱
        },
        {
          key: "needInFile"//完成后是否需要归档
        },
        {
          key: "needRecord"//操作后是否需要记录想法
        },
        {
          key: "recordList"//记录列表
        },
        {
          key: "needFrame"//是否需要弹窗
        },
      ]
    }
  ]
};
