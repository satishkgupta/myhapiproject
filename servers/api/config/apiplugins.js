module.exports = function(apiServer, config) {

    //Options for good pluggin for log generation
    var Good = require('good');
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
                config: './tmp/logs/api_log'
            },{
            //    reporter: require('good-file'),
            //    events: { response: '*' },
            //    config: './tmp/logs/api_response'
            //}, {
                reporter: require('good-console'),
                events: { log: ['error', 'medium'] }
            }, {
            //    reporter: require('good-file'),
            //    events: { ops: '*'},
            //    config: './tmp/logs/api_ops'
            //}, {
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

    //Mailer Plugin
    // Mailer
    //var Handlebars = require('handlebars');

    var mailoptions = {
        transport: {
            service: 'Gmail',
            auth: {
                user: '2014anakin@gmail.com',
                pass: 'Anakin`123'
            }
        }//,
        //views: {
        //    engines: {
        //        html: {
        //            module: Handlebars.create(),
        //            path: Path.join(__dirname, 'lib/views/emails')
        //        }
        //    }
        //}
    };
    var mailplugin = {
        register: require('hapi-mailer'),
        options: mailoptions
    };

    //Register mail plugin
    apiServer.register(mailplugin, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }
    });

    //Register good plugin
    apiServer.register({
        register: Good,
        options: logoptions
    }, function (err) {
        if (err) {
            throw err; // something bad happened loading the plugin
        }
        
    });

};