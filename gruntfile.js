module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [
          {
            src: ["/\*.ts"],
            dest: "./dist"
          }
        ],
        options: {
          module: "commonjs",
          target: "es5",
          sourceMap: true,
          rootDir: "src"
        }
      },
      test: {
        files: [
          {
            src: ["\*.ts"],
            dest: "./"
          }
        ],
        options: {
          module: "commonjs",
          target: "es5",
          sourceMap: true,
          rootDir: "src"
        }
      }
    },
    clean: ['dist', 'test'],
    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-ts");
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask("default", ["clean", "ts:app"]);
  grunt.registerTask("test", ["karma"]);

};
