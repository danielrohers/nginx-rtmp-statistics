module.exports = {

  entry: './src/index.jsx',

  output: {
    filename: './dist/bundle.js'
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel' }
    ]
  }
  
};