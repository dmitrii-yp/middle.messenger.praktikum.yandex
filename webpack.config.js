const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      handlebars: path.resolve(
        __dirname,
        'node_modules',
        'handlebars',
        'dist',
        'handlebars.js'
      ),
    },
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        resourceQuery: { not: [/\.hbs$/] },
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.ts$/,
        use: 'webpack-import-glob-loader',
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
      {
        test: /\.hbs$/i,
        type: 'asset/resource',
        generator: {
          emit: false,
        },
      },
      {
        resourceQuery: /\.hbs$/,
        type: 'asset/source',
      },
    ],
  },
};
