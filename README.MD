# 本作品源码阅读指南

作品名：记录进度目标计数和专注的网页应用程序

作者：赤峰二中张新越

## 1. 源码目录
使用`*`号标注的是个人认为编写较好的部分
```
│  index.html
│  package-lock.json
│  package.json
│  README.MD
│  vite.config.js
├─dist
└─src
    │  App.vue
    │  main.js
    ├─components
    │     AddMenu.vue
    │     Back.vue
    │     ChooseIcon.vue
    │  *  HomeMainSection.vue 
    │     HomeMenu.vue
    │     Loading.vue
    │  *  MessageService.vue
    │     PageHeader.vue
    │     SelectColor.vue
    │     TopBar.vue
    ├─router
    │     index.js
    ├─styles
    │     calendar.scss
    │     common.scss
    │     document.scss
    │     main.scss
    │     message.scss
    │     section.scss
    │     select.scss
    │     tabbar.scss
    │  *  theme.scss
    │     topbar.scss
    ├─utils
    │     bus.js
    │     color.js
    │     db_list_config.js
    │     global.js
    │     helpers.js
    │  *  message.js
    │     touch.js
    └─views
        │    404.vue
        │    AbsorbedView.vue
        │ *  EditView.vue
        │    HomeView.vue
        │    InFileView.vue
        │    SettingsView.vue
        └─settings
                About.vue
                DarkMode.vue
                Instructions.vue
                Recycle.vue
```

## 2. 关键功能模块
`HomeMainSection.vue`：这个组件是首页主要内容展示的部分，其实现逻辑和与其他组件的交互较为复杂。

`MessageService.vue`及其附属文件`message.js`,`message.scss`：此组件提供了局部的消息调度调用的接口,可作为一个独立的小组件迁移于其他项目.

`EditView.vue`：编辑视图是一个重要的功能页面，包括编辑逻辑、数据交互等方面。

## 3. 样式文件
样式文件在项目中扮演着重要角色，影响着整体的视觉效果和用户体验。特别是 theme.scss 文件，巧妙的利用了scss语言特性,提高了可维护性。
