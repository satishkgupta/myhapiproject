var Hapi = require('hapi');
var Good = require('good');

//var server = new Hapi.Server();
var server = new Hapi.Server({ debug: { request: ['error'] } });

server.connection({ host: 'localhost', port: 3000 });

//Options for good pluggin for log generation
var logoptions = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        events: {
                //response: '*',
            }
        }, {
            reporter: require('good-file'),
            events: { log: '*'},
            config: './tmp/logs/gui_log'
        },{
            reporter: require('good-file'),
            events: { response: '*' },
            config: './tmp/logs/gui_response'
        }, {
            reporter: require('good-console'),
            events: { log: ['error', 'medium'] }
        }, {
            reporter: require('good-file'),
            events: { ops: '*'},
            config: './tmp/logs/gui_ops'
        }, {
            reporter: 'good-http',
            events: { error: '*' },
            config: {
            endpoint: 'http://prod.logs:3000',
            wreck: {
                headers: { 'x-api-key' : 12345 }
            }
        }
    }]
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/{name}',
    handler: function (request, reply) {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register({
    register: Good,
    options: logoptions
}, function (err) {
    if (err) {
        throw err; // something bad happened loading the plugin
    }

    server.start(function () {
        server.log('info', 'Server running at: ' + server.info.uri);
    });
});