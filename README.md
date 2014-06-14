# grunt-wr2conv

> wr2conv for grunt

## Install

```
% cd your/grunt/project/root
% npm install grunt-wr2conv --save-dev
```

## Usage
```
module.exports = function(grunt){

	var pkg = grunt.file.readJSON('package.json');

	grunt.initConfig({
		wr2conv: {
			dev1:{
				files: {
					'tmpl/css/': ['css/*.css'],
					'tmpl/': ['*.html']
				}
			},
			dev2:{
				src: ['css/*.css'],
				dest: 'tmpl/css/'
			}
		}
	});

	grunt.loadNpmTasks('grunt-wr2conv');

	// Default task.
	grunt.registerTask('default', ['wr2conv:dev1']);
};
```