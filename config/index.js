const path = require('path')
const resolve = (src) => {
  return path.resolve(__dirname, '..', src)
}

// NOTE 在 sass 中通过别名（@ 或 ~）引用需要指定路径
const sassImporter = function (url) {
  if (url[0] === "~" && url[1] !== "/") {
    return {
      file: path.resolve(__dirname, "..", "node_modules", url.substr(1))
    };
  }

  const reg = /^@styles\/(.*)/;
  return {
    file: reg.test(url)
      ? path.resolve(__dirname, "..", "src/styles", url.match(reg)[1])
      : url
  };
};

const config = {
  projectName: 'taro-react-ts-test',
  date: '2020-7-31',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],

  defineConstants: {
  },
  copy: {
    patterns: [
      {
        from: 'src/components/vant-weapp/wxs/',
        to: 'dist/components/vant-weapp/wxs/'
      },
      {
        from: 'src/components/vant-weapp/button',
        to: 'dist/components/vant-weapp/button'
      },
    ],
    options: {
    }
  },
  alias: {
    '@': resolve('src'),
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [/^.van-.*?$/,],
        },
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: ['taro-ui'],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
