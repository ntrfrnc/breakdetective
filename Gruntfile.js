module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> v<%= pkg.version %> ' +
            '[<%= grunt.template.today("dd-mm-yyyy") %>] | ' +
            '(c) <%= pkg.author %> | <%= pkg.license %> license */',
    'string-replace': {
      title: {
        files: {
          'dist/': ['dist/<%= pkg.name %>.js', 'dist/<%= pkg.name %>.css']
        },
        options: {
          replacements: [
            {
              pattern: /(\/\*\!.*\\*\/)|(\/\/\[\[TITLE\]\])/i,
              replacement: '<%= banner %>'
            }
          ]
        }
      },
      version: {
        files: {
          './': ['README.md', 'demo.html']
        },
        options: {
          replacements: [
            {
              pattern: /(\<b\>|\*\*)?Version:(\<\/b\>|\*\*)? (\<span\>)?[\.\-0-9a-zA-z]+(\<\/span\>)?( *\n)/,
              replacement: '$1Version:$2 $3<%= pkg.version %>$4$5'
            }
          ]
        }
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      build: {
        src: 'dist/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-string-replace');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('rebuild', ['string-replace', 'uglify']);
  grunt.registerTask('vup', ['string-replace:title', 'string-replace:version', 'uglify']);

};
