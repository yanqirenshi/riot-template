module.exports = {
    get: function(uri, callback) {
        fetch(uri)
            .then(function (response) {
                if (response.ok)
                    return response.json();

                // error case
                console.log('Error!' + uri);
                return {};
            })
            .then(callback);
    }
};
