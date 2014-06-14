'use strict';

module.exports = function(grunt){
	var wr2conv = require('wr2conv');
	var fs = require('fs');
	var path = require('path');
	var chalk = require('chalk');

	grunt.registerMultiTask('wr2conv', 'convert data for WebRelease2', function(){
		var global_options = this.options();

		this.files.forEach(function(f){
			var valid = f.src.filter(function(filepath){
				if(!grunt.file.exists(filepath)){
					grunt.log.warn('Source file ' + chalk.cyan(filepath) + ' is not found.');
					return false;
				}else{
					return true;
				}
			});

			if(!valid.length){
				grunt.log.warn('Source file is empty.');
				return false;
			}

			if(!grunt.file.exists(f.dest)){
				grunt.file.mkdir(f.dest);
			}

			var finished = valid.map(function(file){
				var src = grunt.file.read(file);
				var data = wr2conv(src,path.extname(file).replace('.',''));
				var result_file = path.normalize(f.dest + "/") + path.basename(file);
				grunt.file.write(result_file, data);
				var result;
				if(grunt.file.exists(result_file)){
					result = "saved"
				}else{
					result = "created";
				}
				grunt.log.writeln('File ' + chalk.cyan(result_file) + ' ' + result + '.');
				return "1";
			}).join('');

			if(!finished) {
				return grunt.log.warn('Destination not written because file was empty.');
			}
		});
	});
}