export default defineAppConfig({
  pages: [
    "views/home/index", // 首页
    "views/feature/index", // 功能页
    "views/mine/index", // 用户页
  ],
  subpackages: [
    {
      root: "views/subFeature",
      pages: [
        "index", // 占位页面
        "camera/index", // 拍照
        "changeLog/index", // 更新日志
        "map/index", // 地图
        "notice/index", // 服务通知
        "word/index", // 单词本
        "neutralization/index", // 中化大题
        "pharmacological/index", // 药理大题
      ],
    },
    {
      root: "views/subEcharts",
      pages: [
        "index", // echarts 图表
      ],
    },
  ],
  tabBar: {
    list: [
      {
        pagePath: "views/home/index",
        text: "首页",
      },
      {
        pagePath: "views/feature/index",
        text: "功能",
      },
      {
        pagePath: "views/mine/index",
        text: "用户",
      },
    ],
    custom: true, // 自定义tabbar
  },
  requiredPrivateInfos: ["getLocation"],
  requiredBackgroundModes: ["location"],
  permission: {
    "scope.userLocation": {
      desc: "你的位置信息将用于小程序定位", // 持续后台定位
    },
  },
  usingComponents: {}, // 全局引入组件
  window: {
    navigationStyle: "custom", // 自定义的导航栏
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
});
