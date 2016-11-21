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
        var request = new XMLHttpRequest();
        var uri = 'https://api.github.com/users/yanqirenshi/repos';
        request.open('GET', uri, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                dispatch(tasksLoaded(data));
            }
        };
        request.send();
    };
}

function tasksLoaded (tasks) {
    return {
        type: 'TASKS_LOADED',
        data: tasks
    };
}
