module.exports = {
  presets:[ '@babel/preset-env', ["@babel/preset-react", {
    "runtime":"automatic" // 这个是指定react的jsx语法转换成js的方式
  }]]
}