
//punto 13
import express from "express";
import fs from "fs";
import cors from "cors"
import multer from 'multer';
import { fileURLToPath } from 'url';
import { dirname, extname } from 'path';
import { Joya } from "./Class/Joya.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const joya = new Joya();

// app.use(cors());
//punto 14 uso de estructura de carpetas

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
// Ruta GET que devuelve el formulario HTML para cargar una imagen
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/upload.html');
  });

// Ruta POST para recibir y guardar la imagen
app.post('/upload', upload.single('imagen'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('Debes seleccionar una imagen para cargar.');
    }
  
    // Aquí puedes realizar acciones adicionales con la imagen, como almacenar información en una base de datos.
  
    res.status(200).send('Imagen cargada con éxito.');
    console.log('Imagen agregada a la carpeta images');
  });
  
  // Carpeta estática para servir imágenes cargadas
  app.use('/images', express.static('public/images'));


//Aqui iria el JWT

//ACA CONFIGURAMOS TODO EL JWT

// const token = jwt.sign(usuario, 'secreto', { expiresIn: '1h' });

// console.log('JWT generado:', token);


//Listas las rutas
app.use(express.json());
//ruta crear (esta buena)
app.post("/v1/joyas", async (req, res)=>{
    
    //punto 16
    const joyas = await joya.crear(req.body.nombre,req.body.material, req.body.peso, req.body.precio)
    console.log(joyas[0].id);
     //res.status(201).json(await joya.crear(req.body.nombre,req.body.material, req.body.peso, req.body.precio));
     res.status(200).send(`Joya Creada ${joyas[0].id}`);

})

//listarTodo (esta buena)
app.get("/v1/joyas", async(req, res) => {
    try{
        res.json(await joya.listarTodo());
    }catch(e){
        //punto 10
        fs.appendFileSync("./logs/logs.txt", `${Date.now()}: ${e} \n`);
        res.status(500).send("Error al listar");
    }
});
//listar por material
app.get("/v1/joyas/:material", async(req, res) =>{
    //punto 16
    res.json(await joya.listarMaterial(req.params.material));
});

//listar por nombre / me generaba un error por el nombre del endpoint era igual
app.get("/v1/joyas/nombre/:nombre", async(req, res) =>{
    //punto 16
    res.json(await joya.listarNombre(req.params.nombre));
});


//delete
app.delete("/v1/joyas/:id", async (req, res)=>{
    //punto 16
   const resultado = await joya.eliminar(req.params.id) //como estamos recuperando de la url usamos el params
    if(!resultado){ //resultado==0 / !resultado==1
        res.sendStatus(404)
    }else{
        res.sendStatus(200)
        console.log("Joya eliminada con exito")
    }
    //resultado==0?res.sendStatus(404):res.sendStatus(200)
})
//endpoint actualizar/update
app.put("/v1/joyas/:id", async (req, res)=>{
    if (req.body.nombre){
    const resultado = await joya.actualizar(req.body, req.params.id)
    //console.log("Resultado de actualizar:", resultado);//quiero probar
    resultado==0?res.sendStatus(404):res.sendStatus(200); //aca uso ternario
    }else{
        res.sendStatus(400);
    }
})

app.listen(3000, ()=>{console.log("Levantado puerto http://localhost:3000")});

//punto 17 Funciona