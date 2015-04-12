module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index.html');
    });
    app.get('/boiler', function(req, res) {
    	res.render('boiler.html');
    });
    app.get('/recognition', function(req, res) {
    	res.render('recognition.html');
    });
};