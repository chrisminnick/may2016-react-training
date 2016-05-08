const gulp = require("gulp");
const semver	= require("semver");

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


//default task
gulp.task('default', function(done) {
  console.log('BUILD OK');
  done();
});
