# AsoulCnkiFEPlus

![index](markdown/index.png)

对原本的枝网前端进行重构和迁移

现阶段，枝网仍使用原本 Vue2.0 的版本，迁移完成前，新功能也会继续实装

**待迁移完成后更换新版本并停止维护旧版本**

## 迁移描述

1. 从 Vue2 迁移到 Vue3 + TS
2. 打包工具更换为 Vite
3. 使用 TailWindCSS 重构样式

## 如何贡献

先 fork 项目到您的 GitHub 账户，然后再 clone，开新分支并发起 PR

## 当前进度

### Check页
基本迁移完成，输入框上方详情待Result页迁移完成后实装

#### 尚待完成的部分
ElDialog 样式问题: 由于ElDialog上携带style="width:50%",对窄屏体验不佳，需寻找方法实现响应式

可行的方法(不优雅):通过window.onresize 监听窗口大小，改变ElDialog上的width属性

### Rank页
  尚待迁移，目前只封装了接口，简单写了页面

#### 尚未完成的部分

1. 条件筛选组件
2. 页面切换


### Result页

  尚未迁移

## 其他

1. 目前 Element-Plus 没有局部引入，构建后体积较大，后续配置局部引入

      备忘: 目前使用的组件 ElCheckBox ElDialog ElCarousel ElCarouselItem

2. 接口文档参见[这里](https://github.com/ASoulCnki/ASoulCnkiBackend/blob/master/api.md)

## 项目结构

```
src 源码目录
├── api          调用后端API，使用await
│   ├── check    查重API
│   └── rank     作文展API
├── assets       资源文件
│   ├── css      样式和字体文件
│   └── images   图片文件
├── components   组件
│   ├── activity 活动相关组件(彩蛋)
│   ├── check    主站(查重)组件
│   ├── public   公共组件(小作文组件，友情链接，顶部通知栏，侧边栏跑马灯，用户协议)
│   ├── rank     作文展组件
│   └── result   查重结果页组件
├── pages        页面文件夹
├── router       前端路由
└── utils        工具函数(时间格式转换等)
    ├── article  小作文组件的支持函数(重复区间标记, 文本链接转换）
    ├── check    check页支持函数(数据格式转换)
    └── rank     rank页支持函数
```
## 安装

```bash
npm i
```

## 运行 && 打包

### 启动开发机

```bash
npm run dev
```

### 构建

```bash
npm run build
```
