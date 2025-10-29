// karma.conf.cjs
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'webpack'],
    
    // Solo archivos de prueba específicos
    files: [
      'src/**/*.spec.js',
      'src/**/*.spec.jsx'
    ],
    
    preprocessors: {
      'src/**/*.spec.js': ['webpack'],
      'src/**/*.spec.jsx': ['webpack']
    },
    
    webpack: {
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['@babel/preset-env'],
                  ['@babel/preset-react', { runtime: 'automatic' }]
                ]
              }
            }
          }
        ]
      },
      resolve: {
        extensions: ['.js', '.jsx']
      }
    },
    
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};