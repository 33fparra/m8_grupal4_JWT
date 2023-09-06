
//punto 13
import express from "express";
import fs from "fs";
import cors from "cors"
// app.use(cors());
//punto 14 uso de estructura de carpetas
import { Joya } from "./Class/Joya.js"

const app = express();
const joya = new Joya();

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