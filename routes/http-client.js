var http = require('http');
var parseXmlString = require('xml2js').parseString;

HttpClient = (function () {
    HttpClient = function (host, relativeApiUriRoot) {
        this.host = host;
        this.relativeApiUriRoot = relativeApiUriRoot;
    }

    HttpClient.prototype.get = function (relativeUri, callback) {
        var options = {
            host: this.host,
            path: this.relativeApiUriRoot + relativeUri,
            port: 80
        };

        console.log('GET ' + options.host + options.path)
        var request = http.get(options, function (response) {
            console.log('STATUS ' + response.statusCode);
            console.log('HEADERS ' + JSON.stringify(response.headers));
            response.setEncoding('utf8');
            var data = ''
            response.on('data', function (chunk) {
                data += chunk;
            });
            response.on('end', function () {
                console.log('BODY ' + data + '\n');
                parseXmlString(data, function (err, result) {
                    return callback(result.response);
                });
            })
        });

        request.on('error', function (e) {
            console.log('problem with request: ' + e.message);
            return callback(e);
        });
    };
    return HttpClient;
})();
