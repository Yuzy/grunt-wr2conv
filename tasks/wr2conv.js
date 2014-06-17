'use strict';

module.exports = function(grunt){
	var wr2conv = require('wr2conv');
	var fs = require('fs');
	var path = require('path');
	var chalk = require('chalk');

	grunt.registerMultiTask('wr2conv', 'convert data for WebRelease2', function(){
		var report_file;
		var global_options = this.options();
		this.files.forEach(function(f){
			var dry = '';

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

			if('dry' in global_options && global_options.dry) {
				dry = chalk.red('Dry:');
			}
			if('checkResource' in global_options && global_options.checkResource){
				report_file = global_options.checkResource;
			}

			var finished = valid.map(function(file){
				var status;
				var src = grunt.file.read(file);
				var result = wr2conv(src,file);
				if(report_file){
					wr2conv.pushResource()
				}
				var result_file = path.normalize(f.dest + "/") + path.basename(file);
				if(!dry) {
					grunt.file.write(result_file, result);
				}

				if(grunt.file.exists(result_file)){
					status = "saved"
				}else{
					status = "created";
				}
				grunt.log.writeln(dry + 'File ' + chalk.cyan(result_file) + ' ' + status + '.');
				return "1";
			}).join('');

			if(!finished) {
				return grunt.log.warn('Destination not written because file was empty.');
			}
		});

		if(report_file){
			var report = wr2conv.getResourceReport();
			if(report) {
				grunt.file.write(global_options.checkResource, report);
				grunt.log.writeln('Generate report file : ' + chalk.cyan(report_file));
			}
		}
	});
}