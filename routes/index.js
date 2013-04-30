require('./7digital-api.js');

exports.index = function (req, res) {
    res.render('index');
};

exports.search = function (req, res) {
    console.log('hello');
    var api = new SevenDigitalApi();
    api.search(req.query.term, function (tracks) {
        res.json(tracks);
    });
};