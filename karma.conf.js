module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      './*.ts'
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
