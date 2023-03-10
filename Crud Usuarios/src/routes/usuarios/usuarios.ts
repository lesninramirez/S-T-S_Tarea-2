import express from 'express';
const router = express.Router();

import { UsuarioDao } from '@dao/models/Usuarios/UsuariosDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUsuario } from '@dao/models/Usuarios/IUsuarios';
import { Usuarios } from '@libs/Usuarios/Usuarios';

const usuarioDao = new UsuarioDao(MongoDBConn);
let usuariosModel:Usuarios;
usuarioDao.init().then(()=>{
  usuariosModel = new Usuarios(usuarioDao);
});

//const usuariosModel = new usuarios();

//registrar los endpoint en router
router.get('/', (_req, res) => {

    const jsonUrls = {
        "getAll": { "method": "get", "url": "usuarios/all" },
        "getById": { "method": "get", "url": "usuarios/byid/:id" },
        "new": { "method": "post", "url": "usuarios/new" },
        "update": { "method": "put", "url": "usuarios/upd/:id" },
        "delete": { "method": "delete", "url": "usuarios/del/:id" },
    };
    res.status(200).json(jsonUrls);

});

router.get('/all', async (_req, res) => {
    res.status(200).json(await usuariosModel.getAll());
  });

  router.get('/byid/:id', async (req, res)=>{
    const {id: codigo} = req.params;
    const usuario = await usuariosModel.getById(codigo);
    if(usuario){
      return res.status(200).json(usuario);
    }
    return res.status(404).json({"error":"No se encontró el Usuario"});
  });

router.post('/new', async (req, res) => {
    console.log("Usuarios /new request body: ", req.body);
    const { 
        nombre= "Juan", 
        correo= 'juan@gmail.com',
        password= 'abc'
    } = req.body;

    //TODO: Validar Entrada de datos
    const newUsuarios: IUsuario = {
        codigo: "",
        nombre,
        correo,
        password,
        roles: [],
        created: undefined,
        ultimoAcceso: undefined
        
    };
    if (await usuariosModel.add(newUsuarios)) {
        return res.status(200).json({"created": true});
      }
      return res.status(404).json(
        {"error": "Error al agregar un Usuario"}
      );
});

router.put('/upd/:id', async (req, res)=> {
    const { id }= req.params;
    const { 
        nombre= "----NotRecieved------",
        correo= "----NotRecieved------",
        password= 'abc'
    }= req.body;

    if (
        nombre === "----NotRecieved------"
        || correo === "----NotRecieved------"
      ) {
        return res.status(403).json({"error":"Debe venir el nombre y correo correctos"});
      }

    const updateUsuarios: IUsuario= {
        codigo: id,
        nombre,
        correo,
        password,
        roles: [],
        created: undefined,
        ultimoAcceso: undefined
    };
    if (await usuariosModel.update(id, updateUsuarios)) {
        return res
          .status(200)
          .json({"updated": true});
      }
      return res
        .status(404)
        .json(
          {
            "error": "Error al actualizar el Usuario"
          }
        );

});


router.delete('/del/:id', async (req,res)=> {
    const {id: codigo}= req.params;
    if(await usuariosModel.delete(codigo)){
        return res.status(200).json({"deleted": true});
    }
    return res.status(404).json({"error":"No se pudo eliminar el Usuario"});
});

export default router;