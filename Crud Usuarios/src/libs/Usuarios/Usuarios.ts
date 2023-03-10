import { IUsuario } from "@dao/models/Usuarios/IUsuarios";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Usuarios {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevoUsuario: IUsuario) {
    const date = new Date();
    const nueva: IUsuario = {
      ...nuevoUsuario,
      created: date,
      ultimoAcceso: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateUsuarios: IUsuario) {
    const updateObject = { ...updateUsuarios, ultimoAcceso: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}