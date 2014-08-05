module.exports = function(grunt) {

	grunt.initConfig({

		// Import package manifest
		pkg: grunt.file.readJSON("mumble-script.json"),

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
				src: ["src/mumble-script.js"],
				dest: "dist/mumble-script.js"
			},
			css: {
				src: ["src/mumble-script.css"],
				dest: "dist/mumble-script.css"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

		// Lint definitions
		jshint: {
			files: ["src/mumble-script.js"],
			options: {
				jshintrc: ".jshintrc"
			}
		},

		// Minify definitions
		uglify: {
			my_target: {
				src: ["dist/mumble-script.js"],
				dest: "dist/mumble-script.min.js"
			},
			options: {
				banner: "<%= meta.banner %>"
			}
		},

    // CSS Minify
    cssmin: {
      minify: {
        src: "dist/mumble-script.css",
        dest: 'dist/mumble-script.min.css'
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
