module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      './src/**/*.ts'
    ],
    preprocessors: {
      '**/*.ts': ['karma-typescript']
    },
    karmaTypescriptConfig: {
      bundlerOptions: {
        entrypoints: /\.spec\.ts$/
      }
    },
    reporters: ['progress', 'karma-typescript'],
    colors: true,
    browsers: ['PhantomJS'],
    singleRun: true
  })
};
