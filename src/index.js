var riot = require('riot');
var router = require('./router.js');
var store = require('./redux/store.js');
var actions = require('./redux/actions.js');

/* ************************ *
 *  Load Tags
 * ************************ */
/*
 なんかここはスマートじゃないよね。
 全部のタグをここでロードするのは。。。。。
 */
// parts
require('./tags/parts/title-form.tag');
require('./tags/parts/toolbar.tag');
require('./tags/parts/todo-app.tag');
require('./tags/parts/task-list.tag');
require('./tags/parts/sign-in-sns.tag');

// screen
require('./tags/home.tag');
require('./tags/about.tag');
require('./tags/sign-in.tag');
require('./tags/sign-out.tag');
require('./tags/not-found.tag');

/* ************************ *
 *  Main
 * ************************ */
document.addEventListener('DOMContentLoaded', () => {
    riot.mount('*', {
        store: store,
        actions: actions
    });
    router.start();
});
