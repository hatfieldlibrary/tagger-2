/**
 * Created by mspalti on 1/16/17.
 */
import gulp from 'gulp';
import {tasks} from './const';
import {Server as Karma} from 'karma';

gulp.task(tasks.CLIENT_UNIT_TEST, (done) => {
  let _karma = new Karma({
    configFile: process.cwd() + '/karma.conf.js',
    browsers: ['Chrome'],
    singleRun: true
  }, done);

  _karma.start();

});
