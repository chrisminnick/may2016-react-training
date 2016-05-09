const gulp      = require("gulp");
const semver	= require("semver");
const eslint    = require("gulp-eslint");
const webserver = require("gulp-webserver");

//run
gulp.task("run", function() {
    gulp.src("src")
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

//version
gulp.task("version", function(done) {

    console.log("Checking node version: ");
    const packageJson = require("./package.json");
    const expectedVersion	= packageJson.engines.node;
    const actualVersion	= process.version;

    if (semver.neq(expectedVersion,actualVersion)){
        console.log("Incorrect node version. Expected " +
            expectedVersion + ". Actual: " + actualVersion);
        process.exit(1);
    }
    done();
});

//lint
gulp.task("lint", function () {
    return gulp.src(["**/*.js","!node_modules/**"])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

//default task
gulp.task("default", gulp.series("version", "lint", function(done){
    console.log("BUILD OK");
    done();
}));
