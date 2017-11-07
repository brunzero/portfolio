var path = require('path');
var webpack = require('webpack');
var dotenv = require('dotenv');

dotenv.load();

process.noDeprecation = true

if(process.env.NODE_ENV === 'development')
{
  var config = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
      'whatwg-fetch',
      'webpack-hot-middleware/client',
      './app/main'
    ],
    output: {
      path: path.join(__dirname, 'public', 'js'),
      filename: 'bundle.js',
      publicPath: '/js'
    },
    node: {
      fs: 'empty'
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.IgnorePlugin(/\/iconv-loader$/),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': JSON.stringify(true)
      })
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: [
              ['react-transform', {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  }, {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }
                ]
              }]
            ]
          }
        },
        {
          test: /\.css/,
          loaders: [
            'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.scss$/,
          loaders: [
            'style-loader',
            'css-loader',
            'sass-loader',
            /*{
              loader: 'sass-resources-loader',
              options: {
                // Sass files here are global resources
                resources: ['./app/components/Colors.scss'],
              },
            },*/
          ],
        }
      ]
    }
  };
}
else if(process.env.NODE_ENV === 'production'){
  var ExtractTextPlugin = require('extract-text-webpack-plugin');

  const ExtractCSS = new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath('css/[name]-css.css').replace('css/js', 'css');
    },
    allChunks: true
  })
  const ExtractSASS = new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath('css/[name]-sass.css').replace('css/js', 'css');
    },
    allChunks: true
  })

  var config = {
    devtool: 'source-map',
    entry: [
      './app/main'
    ],
    output: {
      path: path.join(__dirname, 'public', 'js'),
      filename: 'bundle.js',
      publicPath: '/js'
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.BROWSER': JSON.stringify(true)
      }),
      ExtractCSS,
      ExtractSASS
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            plugins: [
              ['react-transform', {
                transforms: [
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }
                ]
              }]
            ]
          }
        },
        {
          test: /\.css/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'sass-loader'
            ]
          })
        }
      ]
    }
  };
}


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
