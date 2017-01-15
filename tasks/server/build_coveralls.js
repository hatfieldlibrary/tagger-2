/**
 * Created by mspalti on 1/14/17.
 */

'use strict';

import coveralls from 'gulp-coveralls';

gulp.task('coveralls', function() {
  // lcov.info is the file which has the coverage information we wan't to upload
  if (!process.env.CI) return;
  return gulp.src(__dirname + '/coverage/lcov.info')
    .pipe(coveralls());
});
