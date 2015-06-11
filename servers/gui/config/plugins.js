module.exports = function(server, config) {

    var Good = require('good');

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

    server.register({
        register: Good,
        options: logoptions
    }, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }
        
    });

};