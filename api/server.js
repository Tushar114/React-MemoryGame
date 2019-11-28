// Creating required conts
const Hapi = require('hapi');
const Routes = require('./routes');

// Create a server with a host and port
const server = new Hapi.Server();

// Injecting the Server configuration
server.connection({
  host: 'localhost',
  port: 8000,
  routes: { cors: true },
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
});

// Attaching all the routes to the server
server.route(Routes);
