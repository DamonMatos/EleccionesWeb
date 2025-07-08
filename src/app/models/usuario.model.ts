export class UsuarioModel {
    public token: string;
    public idPersonal: number;
    public apePatPer:string;
    public apeMatPer:string;
    public nomPer:string;
    public numDocPer:string;
    public FotPer:string;
    public fotoBase64:string;
    public idUsuario:number;
    public idPerfil:number;
    public perfil:string;
    public correo:string;
    public estado:number;
    public listMenu:any;
    public listSubMenu:any;

    constructor(object: any) {
        this.token = (object.token) ? object.token : null;
        this.idPersonal = (object.idPersonal) ? object.idPersonal : null;
        this.apePatPer = (object.apePatPer) ? object.apePatPer : null;
        this.apeMatPer = (object.apeMatPer) ? object.apeMatPer : null;
        this.nomPer = (object.nomPer) ? object.nomPer : null;
        this.numDocPer = (object.numDocPer) ? object.numDocPer : null;
        this.FotPer = (object.FotPer) ? object.FotPer : null;
        this.fotoBase64 = (object.fotoBase64) ? object.fotoBase64 : null;
        this.idUsuario = (object.idUsuario) ? object.idUsuario : null;
        this.idPerfil = (object.idPerfil) ? object.idPerfil : null;
        this.perfil = (object.perfil) ? object.perfil : null;
        this.correo = (object.correo) ? object.correo : null;
        this.estado = (object.estado) ? object.estado : null;
        this.listMenu = (object.listMenu) ? object.listMenu : null;
        this.listSubMenu = (object.listSubMenu) ? object.listSubMenu : null;
    }
}
