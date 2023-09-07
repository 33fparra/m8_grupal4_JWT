import express from 'express';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import jwt from 'jsonwebtoken';

import { Joya } from './Class/Joya.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const joya = new Joya();

// Configuración de multer para gestionar la carga de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    const fileExt = extname(file.originalname);
    const filename = `${file.originalname}${Date.now()}${fileExt}`;
    cb(null, filename); // Nombre de archivo único basado en la marca de tiempo
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 3 * 1024 * 1024 }, // Límite de 3 MB para el tamaño del archivo
});

// Middleware para validar el JWT
const SECRET_KEY = 'tu_clave_secreta'; // Cambia esto por tu clave secreta
const validarJWT = (req, res, next) => {
  // Obtener el token del encabezado de la solicitud
  const token = req.header('Authorization');

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token no proporcionado.' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, SECRET_KEY);

    // Agregar el objeto decodificado al objeto de solicitud
    req.usuario = decoded.usuario;

    // Continuar con la ejecución del siguiente middleware o ruta
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Acceso denegado. Token inválido.' });
  }
};

// Ruta POST para crear un JWT a partir de la información del usuario
app.post('/crear-token', (req, res) => {
  const { nombre, email, telefono } = req.body;
  const usuario = { nombre, email, telefono };
  const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Ruta GET que devuelve el formulario HTML para cargar una imagen
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/upload.html');
});

// Ruta POST para recibir y guardar la imagen (protegida por JWT)
app.post('/upload', validarJWT, upload.single('imagen'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('Debes seleccionar una imagen para cargar.');
  }

  // Aquí puedes realizar acciones adicionales con la imagen, como almacenar información en una base de datos.

  res.status(200).send('Imagen cargada con éxito.');
  console.log('Imagen agregada a la carpeta images');
});

// Carpeta estática para servir imágenes cargadas
app.use('/images', express.static('public/images'));

// Ruta para crear una joya (protegida por JWT)
app.post('/v1/joyas', validarJWT, async (req, res) => {
  const joyas = await joya.crear(req.body.nombre, req.body.material, req.body.peso, req.body.precio);
  res.status(201).json(joyas[0]);
});

// Ruta para listar todas las joyas (protegida por JWT)
app.get('/v1/joyas', validarJWT, async (req, res) => {
  try {
    res.json(await joya.listarTodo());
  } catch (e) {
    //punto 10
    fs.appendFileSync('./logs/logs.txt', `${Date.now()}: ${e} \n`);
    res.status(500).send('Error al listar');
  }
});

// Ruta para listar joyas por material (protegida por JWT)
app.get('/v1/joyas/material/:material', validarJWT, async (req, res) => {
  res.json(await joya.listarMaterial(req.params.material));
});

// Ruta para listar joyas por nombre (protegida por JWT)
app.get('/v1/joyas/nombre/:nombre', validarJWT, async (req, res) => {
  res.json(await joya.listarNombre(req.params.nombre));
});

// Ruta para eliminar una joya por ID (protegida por JWT)
app.delete('/v1/joyas/:id', validarJWT, async (req, res) => {
  const resultado = await joya.eliminar(req.params.id);
  if (!resultado) {
    res.sendStatus(404);
  } else {
    res.sendStatus(200);
    console.log('Joya eliminada con éxito');
  }
});

// Ruta para actualizar una joya por ID (protegida por JWT)
app.put('/v1/joyas/:id', validarJWT, async (req, res) => {
  if (req.body.nombre) {
    const resultado = await joya.actualizar(req.body, req.params.id);
    resultado == 0 ? res.sendStatus(404) : res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});

app.listen(3000, () => {
  console.log('Levantado puerto http://localhost:3000');
});
