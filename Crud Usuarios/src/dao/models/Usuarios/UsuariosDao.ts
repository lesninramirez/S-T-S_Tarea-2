import { MongoDAOBase } from "@dao/MongoDAOBase";
import { IDBConnection } from "@server/dao/IDBConnection";
import { IUsuario } from "./IUsuarios";

export class UsuarioDao extends MongoDAOBase<IUsuario>{
  constructor(conexion: IDBConnection){
      super("usuarios", conexion);
  }
}
