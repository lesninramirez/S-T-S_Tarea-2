export interface IUsuario {
    codigo: string;
    correo: string;
    nombre: string;
    password: string;
    roles?: [];
    created?: Date;
    ultimoAcceso?: Date;
  }
  