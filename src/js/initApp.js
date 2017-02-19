var WebAPI = null;
var ACTIONS = null;
var STORE = null;

function makeWebAPI (config) {
    return new Ajax(
        config.ajax.protocol,
        config.ajax.host,
        config.ajax.port,
        true, // cors
        'include' //credentials
    );
}

function initGeniusParty (reducer, storeData) {
    WebAPI = makeWebAPI(_CONFIG);

    ACTIONS = new AppActions();

    if (!storeData.messages) {
        storeData.messages = {
                 _id: 1,
                 active: {},
                 closed: {}
        };
    }

    STORE = new Store(reducer, storeData);
}
