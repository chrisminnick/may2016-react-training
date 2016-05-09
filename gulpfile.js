const gulp      = require("gulp");
const semver	= require("semver");
const eslint    = require("gulp-eslint");

//version
gulp.task('version', function(done) {

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

gulp.task('lint', function () {
    // ESLint ignores files with "node_modules" paths.
    // So, it's best to have gulp ignore the directory as well.
    // Also, Be sure to return the stream from the task;
    // Otherwise, the task may end before the stream has finished.
    return gulp.src(['**/*.js','!node_modules/**'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

//default task
gulp.task('default', gulp.series('version', function(done){
    console.log('BUILD OK');
  done();
}));
