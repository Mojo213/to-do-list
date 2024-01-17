const path = require('path');

module.exports = {
   entry: './src/index.js',
   output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist'),
       publicPath: '/',
   },
   devServer: {
       static: {
           directory: path.join(__dirname, 'dist'),
       },
       compress: true,
       port: 8080,
       open: true,
   },
   module: {
       rules: [
           {
               test: /\.css$/,
               use: ['style-loader', 'css-loader'],
           },
       ],
   },
};
