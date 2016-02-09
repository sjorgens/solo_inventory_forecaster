module.exports = function(grunt){
    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%=grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                src: 'models/models.js',
                dest: 'server/public/assets/scripts/client.min.js'
            }
        },

        watch: {
            scripts: {
                files: ['models/models.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false
                }
            }
        },

        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular-route/angular-route.min.js",
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                "dest": "server/public/vendor/"
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Default task(s)
    grunt.registerTask('default', ['copy', 'uglify']);

};