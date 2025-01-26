# POUI

## Descripción
Esta página web fue diseñada como la base de un proyecto para una emprendedora dedicada a la venta de velas aromáticas, difusores y otros productos relacionados con la aromaterapia y el bienestar. El sitio ofrece una experiencia cálida y elegante que refleja la esencia del negocio, con un diseño centrado en destacar la calidad artesanal y los beneficios de los productos.

---

## Características

- **Servidor HTTP personalizado:** Manejo manual de rutas utilizando el módulo HTTP de Node.js.
- **Procesamiento de formularios:** Lectura y procesamiento de parámetros enviados desde formularios.
- **Rutas dinámicas:** Soporte para rutas específicas y predeterminadas.
- **Manejo de errores:** Respuestas claras para rutas inexistentes (404) y errores internos del servidor (500).
- **Manejo de archivos estáticos:** Servido de HTML, CSS, imágenes y otros archivos estáticos.

---

## Tecnologías Utilizadas

- **Node.js:** Entorno de ejecución JavaScript.
- **Módulos nativos:**
  - `http`: Para crear y gestionar el servidor.
  - `url`: Para manejar y analizar URLs.
  - `fs`: Para operaciones de lectura y escritura de archivos.
  - `path`: Para gestionar rutas de archivos de manera segura.

---

## Estructura del Proyecto

```bash
project-root/
├── server.js 
├── src/
    ├── app.js
    └── validar.js                
├── public/             
│   ├── index.html      
│   ├── catalogo.html   
│   ├── formulario.html 
│   ├── quienesomos.html 
│   ├── desc_product.html
│   ├── mensaje-enviado.html
│   ├── css/            
│   └── img/                        
```

---

## Instalación y Uso

   ```bash
   git clone https://github.com/Pulpoide/aoi1_w2.git
   cd
   npm install
   node server.js
   ```

---

## Uso

- **Inicio:** Visita `http://localhost:8008/` para ver la página principal.
- **Rutas Disponibles:**
  - ``: Muestra el catálogo de productos.
  - `/formulario`: Formulario de contacto.
  - `/quienesomos`: Información sobre la organización.
  - `/desc_product`: Detalles de productos.
  - `/procesar`: Procesa los datos enviados desde el formulario.

---

## Autor

[**Joaquin D. Olivero**](https://github.com/Pulpoide) -> 
[LinkedIn](https://www.linkedin.com/in/JoaquinOlivero)

