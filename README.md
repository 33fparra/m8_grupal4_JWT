<img src="public/images/boldoMedio.png" align="right" />
 <h1 align= left ><b>Grupal 4 M8 / EquipoBoldo</b> <img src = "https://media.giphy.com/media/gF2m2JOyGReppog8hU/giphy.gif" width = 80px></h1>

<br>

<h2><b>Descripción del Proyecto "Gemas Preciosas"</b> <img src ="https://media.giphy.com/media/RIGGWvHpHhtQqJN8Hx/giphy.gif" width = 50px></h2>

📝 La joyería "Gemas Preciosas" es una empresa familiar que se dedica a la venta de joyas finas y personalizadas. La joyería ha experimentado un crecimiento significativo en los últimos años y ha decidido digitalizar su proceso de registro y seguimiento de joyas para mejorar la eficiencia y la gesƟón de su inventario. Este será el comienzo del proyecto por lo cual te solicitan preparar el servidor que tendrá toda la lógica necesaria para el desarrollo:
Requerimientos: 
 Implementa un servidor con express uƟlizando el puerto 3000. X
 Disponibiliza una ruta para, crear, editar, eliminar y obtener todas las joyas.  (X) falta editar
 Disponibiliza dos rutas que permitan buscar una joya por el nombre y un filtro por material, (repasar creacion de filtros) X
Ambas tendrán la opción de ordenar la información ascendente o descendente (opcional). esto me falta 
 La ruta para crear debe responder con la información de la joya creada, además se necesita un id correlativo a la canƟdad de joyas creadas. (serial ok)
 La ruta para editar debe responder con el objeto editado. ??????
 La ruta para eliminar debe responder con un boolean. (true false)
 Y la ruta para obtener las joyas debe responder con un Array de objetos. ()


<br>

<h2><b>Instrucciones de Instalación</b> <img src = "https://media.giphy.com/media/3WZJkScSyfYVl7mGLd/giphy.gif" width = 60px></h2> 

⚙️ Para instalar las dependencias necesarias, sigue los siguientes pasos:

1. Clona el repositorio en tu máquina local.
2. Abre una terminal y navega hasta la carpeta del proyecto.
3. Ejecuta el siguiente comando para instalar las dependencias:

   npm install

4. Abrir el archivo html ingresando al https://localhost:3000
5. Para ejecutar: node server.js o en su defecto con nodemon server.js


<br>

<details> <img src = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTFtdWgyMmFrcHd4NjhuZWJ4aDJpcTlkbWlyNGQ4dDJwa2ZwZmptcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/B4AgroOi1LkdPxMllY/giphy.gif" width = 50px> <summary><b>Ver las instrucciones</b></summary> 


1. Instalar las dependencias:

   ```sh
   npm install
   ```

2. En el caso de no poder instalar las dependencias:

   ```sh
   npm install --force
   ```

3. Las librerias que estamos ocupando `package.json`:

    ````sh
    ... 
    "name": "helpers",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    + "type": "module",
    "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
    "esm": "^3.2.25",
    "express": "^4.18.2",
    "fs": "^0.0.1-security",
    "node-fetch": "^3.3.2",
    "pg": "^8.11.2",
    "sequelize": "^6.32.1",
    "uuid": "^9.0.0"
    }
    ````

 
</details>

## Se Evalua :sparkles:

✨ Puntos a evaluar:
Consideraciones: 
 En esta etapa no es necesario la persistencia de datos. 
 Modulariza para un mejor orden. 
 La joya tendrá los siguientes atributos.
o Nombre
o Peso
o Precio
o Material 
 Añade control de errores.


<br>

<h2><b>Base de Datos</b> <img src ="https://media.giphy.com/media/EK5nB6wQKKN86j7GWx/giphy.gif" width = 50px></h2>

![Foto de BD]()

<br>

<h2><b>GITHUB</b> <img src ="https://media.giphy.com/media/WZAQgT7E0NBfYnvL1C/giphy.gif" width = 50px></h2>

1. Loreto Godoy : https://github.com/loreGodoyUp

2. Daniel Mendez : https://github.com/danimen81

3. Zimram Blanco : https://github.com/Zimram

4. Jose Fuentealba : https://github.com/JoseFelipeGeo

5. Boris Guiñez : https://github.com/boanguibe

6. Alfonso Mujica : https://github.com/ALFONSOMUJICAS

7. Felipe Andres Parra : https://github.com/33fparra


### Este proyecto está bajo la licencia ADALID.
<img src="public/images/boldoMedio.png" align="right" />

