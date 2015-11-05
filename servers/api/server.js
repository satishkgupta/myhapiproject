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

    //var reqdatajson = JSON.parse(request.params.details);
    //var datajson = request.payload.phoneNumber;
    //var requesttext = encodeURIComponent(request.params.details);
    var text = {
          Name: request.payload.Name 
        , phoneNumber: request.payload.phoneNumber 
        , address: request.payload.address 
        , email: request.payload.email
    };


    //var text = JSON.stringify(reqdatajson, null, '  ');
    var data = {
        from: 'contact@physioncare.com',
        to: 'contact@physioncare.com',
        subject: request.payload.Name.toString().concat(' / ').concat(request.payload.email.toString()),
        html: JSON.stringify(text, null, '  '),
        context: {
            name: 'Satish Gupta'
        }
    };

    var Mailer = request.server.plugins.mailer;
    Mailer.sendMail(data, function (err, info) {
        reply();
    });
};

apiServer.route({ method: 'post', path: '/submit', handler: handler });

apiServer.route({
    method: 'GET',
    path: '/loaderio-4eb634ba88e795b17b3b06e6da542f3b/',
    handler: function (request, reply) {
        reply('loaderio-4eb634ba88e795b17b3b06e6da542f3b');
    }
});

if (!module.parent) {
    apiServer.start(function() {
        var message = 'api Server started at: ' + apiServer.info.uri;
        console.log(message);
    });
}

module.exports = apiServer;
root@localhost:~/myhapiproject/serv