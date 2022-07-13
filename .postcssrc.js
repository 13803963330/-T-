module.exports = {
  plugins: {
    // autoprefixer: {
    //   browsers: ["Android >= 4.0", "iOS >= 8"],
    // },
    "postcss-pxtorem": {
      // 根据375窗口适配
      rootValue: (module) => {
        if (/vant/gi.test(module.file)) {
          return 37.5;
        } else return 75;
      },
      // 适配属性所以
      propList: ["*"],
    },
  },
};
