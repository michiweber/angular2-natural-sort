module.exports = function(grunt) {
  "use strict";

  grunt.initConfig({
    ts: {
      app: {
        files: [
          {
            src: ["src/\*\*/\*.ts", "!src/.baseDir.ts", "!src/test/\*\*/\*.ts"],
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
            src: ["src/\*.ts", "!src/test/.baseDir.ts"],
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
    copy: {
      main: {
        src: 'src/index.ts',
        dest: 'index.ts'
      },
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
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask("default", ["clean", "ts:app", "copy"]);
  grunt.registerTask("test", ["karma"]);

};
