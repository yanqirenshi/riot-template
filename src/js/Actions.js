class Actions extends Vanilla_Redux_Actions {
    movePage (data) {
        STORE.dispatch({
            type: 'MOVE-PAGE',
            data: data
        });
    }
    fetchData () {
        API.get('/', function (response) {
            STORE.dispatch(this.fetchedData(response));
        }.bind(this));
    }
    fetchedData (response) {
        return {
            type: 'FETCHED-DATA',
            data: response,
            target: 'stage'
        };
    }
}
