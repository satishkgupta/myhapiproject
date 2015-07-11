var Hapi = require('hapi');
var config = require('../../config');


// API SERVER
//var apiServer = new Hapi.Server(config.api.host, config.api.port)

var apiServer = new Hapi.Server({ debug: { request: ['error'] } });
apiServer.connection({ host: config.api.host, port: config.api.port });

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./config/apiplugins')(apiServer, config);

//Mailer handler
var handler = function (request, reply) {

    var reqdatajson = JSON.parse(request.params.details);
    //var datajson = request.payload.phoneNumber;
    //var requesttext = encodeURIComponent(request.params.details);
    var text = JSON.stringify(reqdatajson, null, '  ');

    var data = {
        from: '2014anakin@gmail.com',
        to: 'physiocarepvtltd@gmail.com',
        subject: reqdatajson.appointment.concat(' / ').concat(reqdatajson.email),
        html: text,
        context: {
            name: 'Satish Gupta'
        }
    };

    var Mailer = request.server.plugins.mailer;
    Mailer.sendMail(data, function (err, info) {

        reply();
    });
};
apiServer.route({ method: 'post', path: '/submit/{details}', handler: handler });


if (!module.parent) {
    apiServer.start(function() {
        var message = 'api Server started at: ' + apiServer.info.uri;
        apiServer.log(message);
    });
}

module.exports = apiServer;