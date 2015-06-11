// This is the assets controller. Goal is to serve css, js, partials, images, or bower packages.
module.exports = {
    index: {
        handler: function(request, reply) {
            reply.view("index");
        },
        app: {
            name: 'index'
        }
    }
}