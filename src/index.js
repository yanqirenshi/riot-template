var riot = require('riot');
var redux = require('redux');

/* ************************ *
 *  Load Tags
 * ************************ */
// parts
require('./tags/parts/sample-output.tag');
require('./tags/parts/title-form.tag');
require('./tags/parts/toolbar.tag');
// screen
require('./tags/home.tag');
require('./tags/about.tag');
require('./tags/sign-in.tag');
require('./tags/sign-out.tag');
require('./tags/not-found.tag');


/* ************************ *
 *  Store
 * ************************ */
var store = redux.createStore(
    require('./redux/dispacher.js'),
    {
        user: null,
        title: 'Default Title'
    }
);


/* ************************ *
 *  Router
 * ************************ */
var router = require('./router.js');

/* ************************ *
 *  Main
 * ************************ */
document.addEventListener('DOMContentLoaded', () => {
    riot.mount(
        '*',
        {store: store}
    );
    router.start();
});
