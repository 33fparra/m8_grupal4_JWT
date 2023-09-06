import { pool } from "../Conexion/db.js";
//punto 8
export class Joya{
    constructor(){
        this.id;
        this.nombre;
        this.material;
        this.peso;
        this.precio;
        this.created_at;
        this.updated_at;
    }
    //punto 15
    async crear(nombre, material, peso, precio){ //duda solo va por el nombre
        //punto 19
        const resultado = await pool.query(`insert into joyas (nombre,material,peso,precio,created_at, updated_at) values ($1, $2, $3, $4, now(), now()) RETURNING id, nombre, material, peso, precio`,[nombre, material, peso, precio]); 
        pool.release;
        return resultado.rows;   
    }

    async listarTodo(){
        //punto 4
        const resultado = await pool.query(`select id, nombre,material,peso,precio, created_at, updated_at from joyas order by nombre`);
        pool.release;
        return resultado.rows;
    }

    async listarMaterial(material){
        //punto 3
        const resultado = await pool.query("select id,nombre,material,peso,precio, created_at, updated_at from joyas where material = $1", [material]);

        // pool.release;
        return resultado.rows;
    }
    async listarNombre(nombre){
        //punto 3
        const resultado = await pool.query("select id, nombre,material,peso,precio, created_at, updated_at from joyas where nombre = $1", [nombre]);
        // pool.release;
        return resultado.rows;
    }

    async eliminar(id){
        //punto 3
        const resultado = await pool.query("delete from joyas where id = $1", [id]);
        pool.release;
        // console.log(resultado)
        return resultado.rows;
    }
    // *validacion de estructura
    async actualizar(objeto, id){ 
        //punto 3
        const resultado = await pool.query("update joyas set nombre=$2, material=$3,peso=$4,precio=$5,created_at=now() where id = $1", [id, objeto.nombre, objeto.material, objeto.peso, objeto.precio]); 
        pool.release;
        // console.log(resultado)
        // return resultado.rows;
        return resultado.rowCount;
    }
    //siempre simplificar 
}
