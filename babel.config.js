module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  "plugins": [
    ["import", { libraryName: "@ant-design/react-native" }] // 与 Web 平台的区别是不需要设置 style
  ]
};
