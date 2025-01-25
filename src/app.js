
const urlx = require('url');
const fs = require('fs').promises;
const path = require('path');
const validar = require('../public/js/validar')

// Funciones:
function getMimeType(filePath) {
  const extension = filePath.split('.').pop();
  const mimeTypes = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpeg',
    'png': 'image/png',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
  };

  return mimeTypes[extension];
}

async function procesarForm(filePath, parametros, res) {
  const { username, email, message } = parametros;
  const errores = validar.validarForm(username, email, message);

  if (errores.length > 0) {
    const mensajeError = errores.join('\n');
    console.log(mensajeError);

  } else {
    try {
      let data = await fs.readFile(filePath, 'utf-8');

      const pageHTML = data
        .replace('{{name}}', username || 'Usuario desconocido')
        .replace('{{email}}', email || 'Email no proporcionado')
        .replace('{{message}}', message || 'Sin mensaje');

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(pageHTML);

    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor - No se pudo leer el archivo');
    }
  }
}

async function serveFile(filePath, response) {
  try {
    await fs.stat(filePath);

    const content = await fs.readFile(filePath);

    const contentType = getMimeType(filePath) || 'application/octet-stream';

    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  } catch (error) {
    if (error.code === 'ENOENT') {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end('<h1>Error 404: No existe el recurso solicitado</h1>');
    } else {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('Error interno');
    }
  }
}


module.exports = {
  handleRequest: async (req, res) => {
    try {
      var reqURL = req.url;
      var url = new URL('http://localhost:8008' + reqURL);

      if (reqURL.includes('/procesar')) {
        const filePath = path.join(__dirname, '..', 'public', 'mensaje-enviado.html');
        const parametros = urlx.parse(reqURL, true).query;

        procesarForm(filePath, parametros, res);
      } else if (req.method === 'GET') {

        let camino;

        switch (reqURL) {
          case '/':
            camino = 'public/index.html';
            break;
          case '/catalogo':
            camino = 'public/catalogo.html';
            break;
          case '/formulario':
            camino = 'public/formulario.html';
            break;
          case '/quienesomos':
            camino = 'public/quienesomos.html';
            break;
          case '/desc_product':
            camino = 'public/desc_product.html';
            break;
          default:
            camino = path.join('public', url.pathname);
        }

        await serveFile(camino, res);
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404 Not Found</h1>');
      }
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error interno del servidor :(');
      console.error('Error en handleRequest:', error);
    }
  }
};

