module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("mumble-widget.json"),

		// Banner definitions
		meta: {
			banner: "/*\n" +
				" *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
				" *  <%= pkg.description %>\n" +
				" *  <%= pkg.homepage %>\n" +
				" *\n" +
				" *  Made by <%= pkg.author.name %>\n" +
				" *  Under <%= pkg.licenses[0].type %> License\n" +
				" */\n"
		},

		// Concat definitions
		concat: {
			js: {
				src: ["src/mumble-widget.js"],
				dest: "dist/mumble-widget.js"
			},
			css: {
				src: ["src/mumble-widget.css"],
				dest: "dist/mumble-widget.css"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/mumble-widget.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/mumble-widget.js"],
				dest: "dist/mumble-widget.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

    // CSS Minify
    cssmin: {
      minify: {
        src: "dist/mumble-widget.css",
        dest: 'dist/mumble-widget.min.css'
      },
			options: {
				banner: "<%= meta.banner %>"
			}
    },

    // Copy Template to dist
    copy: {
      main: {
        src: 'src/template.html',
        dest: 'dist/template.html',
      },
    }

	});

	grunt.loadNpmTasks("grunt-contrib-concat");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-cssmin");
	grunt.loadNpmTasks("grunt-contrib-copy");

	grunt.registerTask("default", ["jshint", "concat", "uglify", "cssmin", "copy"]);
	grunt.registerTask("travis", ["jshint"]);

};
