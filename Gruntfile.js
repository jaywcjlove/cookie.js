// 包装函数
module.exports = function(grunt) {
    
    // 任务配置,所有插件的配置信息
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        dist: {
            default_options: {
                files: {
                    "dist":['cookie.js']
                }
            }
        },
        // watch插件的配置信息
        watch: {
            js: {
                files: ['cookie.js'],
                tasks: ['default']
            }
        }
    });

    // 任务加载
    require('load-grunt-tasks')(grunt, {
        scope: 'devDependencies'
    });


    // 告诉grunt当我们在终端中输入grunt时需要做些什么
    grunt.registerTask('default', ['dist']);

};
