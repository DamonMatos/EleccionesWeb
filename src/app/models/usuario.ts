export class UsuarioLogin {
    public correo : string;
    public clave  : string;
    constructor(object: any) {
        this.correo = (object.correo) ? object.correo : null;
        this.clave = (object.clave) ? object.clave : null;
    }
}