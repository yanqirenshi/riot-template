class AppActions extends Actions{
    loadData (data) {
        WebAPI.get('/data', function (data) {
            STORE.dispatch(this.loadedData(data));
        }.bind(this));
    }

    loadedData (data) {
        return {
            type: 'LOADED-PROJECTS',
            data: data
        };
    }

    openMakeDataForm () {
        return {
            type: 'OPEN-MAKE-DATA-FORM'
        };
    }

    moveHome () {
        location.href = '/';
    }
}
