
// Constantes
const urlx = require('url');
const fs = require('fs/promises');
const path = require('path');


 // Función para obtener el tipo de contenido (MIME type) según la extensión del archivo
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


// Función genérica para renderizar HTML
function renderHTML(filePath, res){
    fs.readFile(filePath, 'utf-8')
                .then(data => {
                    const contentType = getMimeType(filePath) || 'application/octet-stream';
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(data);
                })
                .catch(err => {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Error interno del servidor - No se pudo leer el archivo');
                }); 
}

// Función para procesar los parámetros y reemplazarlos en "registro.html".
function procesarForm(filePath, parametros, res){
  
  const name = parametros.username;
  const email = parametros.email;
  const message = parametros.message;

  fs.readFile(filePath, 'utf-8')
          .then(data => {
              
              const pageHTML = data
              .replace('{{name}}', name)
              .replace('{{email}}', email)
              .replace('{{message}}', message);
              
              res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
              res.end(pageHTML);
          })
          .catch(err => {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Error interno del servidor - No se pudo leer el archivo');
          });
}


// Función para servir un archivo
function serveFile(filePath, response) {
    fs.stat(filePath) 
      .then(() => { 
        return fs.readFile(filePath); 
      })
      .then(content => { 
        const contentType = getMimeType(filePath) || 'application/octet-stream';
      
        response.writeHead(200, { 'Content-Type': contentType });
        response.end(content); 
      })
      .catch(error => {
        if (error.code === 'ENOENT') {
          response.writeHead(404, { 'Content-Type': 'text/html' });
          response.end('<h1>Error 404: No existe el recurso solicitado</h1>');
        } else {
          response.writeHead(500, { 'Content-Type': 'text/plain' });
          response.end('Error interno');
        }
      });
  }


module.exports = {
    handleRequest: (req, res) =>{
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        
        var reqURL = req.url;
        var url = new URL('http://localhost:8008' + reqURL);

        if(reqURL.includes('/procesar')){
          
          var filePath = path.join(__dirname, './public/registro.html');
          
          // Parámetros obtenidos:
          const parametros = urlx.parse(reqURL, true).query;
          
          procesarForm(filePath, parametros, res);
          
        }else if(req.method === 'GET' && reqURL === '/catalogo'){
            let camino = 'public/catalogo.html'; 
            serveFile(camino, res);
        }else if(req.method === 'GET' && reqURL === '/formulario'){
          let camino = 'public/formulario.html'; 
          serveFile(camino, res);
        }else if(req.method === 'GET' && reqURL === '/quienesomos'){
          let camino = 'public/quienesomos.html'; 
          serveFile(camino, res);
        }else if(req.method === 'GET' && reqURL === '/desc_product'){
          let camino = 'public/desc_product.html'; 
          serveFile(camino, res);
        }else{
            
            let camino = 'public' + url.pathname;
            // Le pega al GET 
            serveFile(camino, res);

            console.log("*---------- GET -----------*");
            console.log("URL = "+ url);
            console.log("REQUEST URL = "+ req.url);
            console.log("CAMINO = "+ camino);
            console.log("URL.PATHNAME = "+ url.pathname);
            console.log("*-------------------------*");        
        }


        
        
        



        // if (camino === 'public/') {
        //     camino = 'public/index.html';   
        // }

        

        
        // Si trabajamos con parámetros:
        // const parametros = urlx.parse(req.url, true).query;
        // const name = parametros.user_name;
        // const email = parametros.user_email;
        // const message = parametros.user_message;

        // fs.readFile(filePath, 'utf-8')
        // .then(data => {
            
        //     const pageHTML = data
        //     .replace('{{name}}', name)
        //     .replace('{{email}}', email)
        //     .replace('{{message}}', message);
            
        //     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        //     res.end(pageHTML);
        // })
        // .catch(err => {
        //     res.writeHead(500, { 'Content-Type': 'text/plain' });
        //     res.end('Error interno del servidor - No se pudo leer el archivo');
        // }); 
        // ---------------------

        

       

        // Como funcionaban las rutas, pero no el css.
        if(req.method == ''){
        var reqURL = urlx.parse(req.url).pathname;
    
            switch(reqURL){
                case '/index.html':
                    var filePath = path.join(__dirname, './index.html');
                    renderHTML(filePath, res);
                break;

                case '/catalogo':
                    var filePath = path.join(__dirname, 'catalogo.html');
                    renderHTML(filePath, res);
                break;

                case '/formulario':
                    var filePath = path.join(__dirname, 'formulario.html');
                    renderHTML(filePath, res);
                break;

                case '/quienes':
                    var filePath = path.join(__dirname, 'quienesomos.html');
                    renderHTML(filePath, res);
                break;

                case '/procesar':
                    var filePath = path.join(__dirname, 'registro.html');
                    // Parámetros:
                    const parametros = url.parse(req.url, true).query;
                    const name = parametros.user_name;
                    const email = parametros.user_email;
                    const message = parametros.user_message;

                    fs.readFile(filePath, 'utf-8')
                    .then(data => {
                        
                        const pageHTML = data
                        .replace('{{name}}', name)
                        .replace('{{email}}', email)
                        .replace('{{message}}', message);
                        
                        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                        res.end(pageHTML);
                    })
                    .catch(err => {
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Error interno del servidor - No se pudo leer el archivo');
                    }); 
                break;

                default:
                    res.writeHead(404);
                    res.write('Ruta no encontrada!');
                    res.end();
                break;
            }
        }


    }
};

