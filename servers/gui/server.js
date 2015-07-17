var Hapi = require('hapi');
    config = require('../../config');

//var server = new Hapi.Server();
var server = new Hapi.Server({ debug: { request: ['error'] } });
server.connection({ host: config.gui.host, port: config.gui.port });

// Bootstrap Hapi Server Plugins, passes the server object to the plugins
require('./config/plugins')(server, config);

// Require the routes and pass the server object.
var routes = require('./config/routes')(server);
// Add the server routes
server.route(routes);

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: './servers/gui',
    path: './views',
    //layoutPath: './views/layout',
    //helpersPath: './views/helpers'
});

//To Start GUI Server
if (!module.parent) {
    server.start(function() {
        var message = 'GUI started at: ' + server.info.uri;
        console.log(message);
    });
}

module.exports = server;