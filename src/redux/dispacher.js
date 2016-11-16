var reducer = function (state={title:'Default title'}, action) {
    switch (action.type) {
        case 'CHANGE_TITLE':
            return Object.assign({},state,{title: action.data});
        default:
            return state;
    }
};

module.exports = reducer;
