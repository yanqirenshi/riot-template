var redux = require('redux');
var thunk = require('redux-thunk');

var createStoreWithMiddleware = redux.compose(
    redux.applyMiddleware(thunk.default)
)(redux.createStore);

var store = createStoreWithMiddleware(
    require('./reducer.js'),
    {
        title:'Default Title',
        tasks:[]
    }
);

module.exports = store;
