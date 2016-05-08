const gulp = require("gulp");

//version
gulp.task('version', function(done) {

    console.log("Checking node version: ");
    const packageJson = require("./package.json");
    const expectedVersion	= packageJson.engines.node;
    const actualVersion	= process.version;

    


});
//default task
gulp.task('default', function(done) {
  console.log('BUILD OK');
  done();
});
