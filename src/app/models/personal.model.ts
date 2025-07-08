import { UsuarioModel } from './usuario.model';

export class PersonalModel extends UsuarioModel 
{
    public nacimiento: string ='';
    public tipodocumento: string ='';
    public fehNacPer:string='';
    public tipDocPer:string='';

}