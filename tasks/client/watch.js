import gulp from 'gulp';
import browserSync from 'browser-sync';
import {path, tasks} from './const';

const JS = path.DEV + '**/*.js';
const CSS = path.DEV + '**/*.css';
const HTML = path.DEV + '**/*.html';

gulp.task(tasks.CLIENT_RELOAD, () => {
  return browserSync.reload();
});

gulp.task(tasks.CLIENT_WATCH, () => {

  browserSync({port: 3001, proxy: "http://localhost:3000/tagger/", reloadDelay: 1000});

  let _watchable = [];

  _watchable.push(JS);
  _watchable.push(CSS);
  _watchable.push(HTML);

  return gulp.watch(_watchable, [tasks.CLIENT_RELOAD]);
});
