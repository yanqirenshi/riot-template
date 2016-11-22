var ajax = require('../util/ajax.js');

module.exports = {
    changeTitle: changeTitle,
    loadTasks: loadTasks
};

function changeTitle (newTitle) {
    return {
        type:'CHANGE_TITLE',
        data: newTitle
    };
}

function loadTasks () {
    return function (dispatch, getState) {
        var uri = 'https://api.github.com/users/yanqirenshi/repos';
        ajax.get(uri, function (json) {
            dispatch(tasksLoaded(json));
        });
    };
}

function tasksLoaded (tasks) {
    return {
        type: 'TASKS_LOADED',
        data: tasks
    };
}
