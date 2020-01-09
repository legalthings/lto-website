'use strict';

const gulp = require('gulp');
const HubRegistry = require('gulp-hub');

const hub = new HubRegistry(['gulp_tasks/*.js']);
gulp.registry(hub);

// -----------------------------------------------------------------------------
// Task
// -----------------------------------------------------------------------------

gulp.task("build-fast", gulp.parallel("compile-sass", "compile-nunjucks", "compile-vendor", "compile-scripts", "copy-images", "copy-media", "copy-documents", "copy-livicons-assets", "copy-resources", "copy-meta"));
gulp.task("build", gulp.parallel("compile-sass", "compile-nunjucks", "compile-vendor", "compile-scripts", "optimize-images", "generate-webp", "copy-media", "copy-documents", "copy-livicons-assets", "compile-fonts", "copy-resources", "copy-meta"));

gulp.task("build-prod-fast", gulp.series("clean:dist", "build-fast", "critical"));
gulp.task("build-prod", gulp.series("clean:dist", "build", "critical", "sitemap"));

gulp.task("default", gulp.parallel("build-fast", "watch", "browser-sync"));
gulp.task("serve", gulp.parallel("browser-sync"));