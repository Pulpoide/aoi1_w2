const http = require('http');
const app = require('./app');
const PORT = 8008;

http.createServer(app.handleRequest).listen(PORT, () => { 
    console.log(`Servidor en ejecución en http://localhost:${PORT}/index.html`);
});