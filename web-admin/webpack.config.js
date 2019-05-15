const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  entry: {
    babelpolyfill: 'babel-polyfill',
    index: './src/index.js',
    indexController: './src/controller/IndexController.js',
    actionsController: './src/controller/ActionsController.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist/bundle'),
    filename: '[name].bundle.js'
  },
  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // },
    minimizer: [
      new TerserJSPlugin({
        terserOptions:{
          output: {
            comments: false,
          },
        },
        cache: true,
        parallel: true,
        sourceMap: true,
      }), 
      new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css.css',
    }),
  ],
  module: {
    rules: [
      
      //BABEL
      { 
        test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" 
      },

      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader }, 
          { loader: 'css-loader' }
        ]
      },
      
      //USADO PARA COMPILAR CSS NO HTML
      /*{
        test: /\.css$/,
        use: [
          { loader: 'style-loader' }, 
          { loader: 'css-loader' }
        ]
      }*/

      //CRIA ARQUIVO PARA CSS SEPARADO
      /*{
        test: /\.css$/,
        use: [
          { loader: 'style-loader/url' }, 
          { loader: 'file-loader' }
        ]
      },*/

      //Bootstrap
      {
        test: /\.(scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader, // usa plugin extrator de css  --- 'style-loader' = inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      }
    ]
  },
  devServer: {
    contentBase: './dist',
    port: '9000'
  }
};