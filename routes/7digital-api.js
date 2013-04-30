require('./http-client.js');

SevenDigitalApi = (function () {
    SevenDigitalApi = function () {
        this.consumerKey = 'test-api';
        this.httpClient = new HttpClient('api.7digital.com', '/1.2/');
    }

    SevenDigitalApi.prototype.search = function (trackName, callback) {
        var path = 'track/search?' 
            + 'oauth_consumer_key=' + this.consumerKey 
            + '&q=' + encodeURIComponent(trackName)
            + '&streamable=true';
        this.httpClient.get(path, function (data) {
            return callback(data.searchResults[0].searchResult);
        });
    };

    return SevenDigitalApi;
})();