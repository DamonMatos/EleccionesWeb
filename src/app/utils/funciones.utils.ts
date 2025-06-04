import { UsuarioModel } from './../models/usuario.model';
import { LoginStorageService } from '../storage/LoginStorageService';
import Swal from 'sweetalert2';

export default class Utils {

  static VISTA_RENDICION_GENERAL = 'general';
  static VISTA_RENDICION_HORAS = 'horas';
  static VISTA_RENDICION_GASTOS = 'gastos';
  static VISTA_RENDICION_ENVIAR = 'enviar';

  static RENDICION_LOCAL = 'LOCAL';
  static RENDICION_VIAJE = 'VIAJE';
  static CODIGO_ORIGEN_PERU = '002';

  static MODIFICACION_OBSERVACION = '2';
  static MODIFICACION_MONTO = '1';
  static COLOR_NARANJA = '#FF9C33';

  static LS_TIPO_DOCUMENTO = 'tipoDocumento';
  static LS_DOCUMENTO = 'documento';
  static LS_EDITAR = 'editar';
  static LS_PRINCIPAL = 'principal';
  static LS_TIPO_RENDICION = 'tipoRendicion';
  static LS_ESTADO_DOCUMENTO = 'estadoDocumento';

  static CODIGO_MODULO = 'REN';


  static fechaActual() {
    var fecha = new Date();
    return fecha.toISOString().substring(0, 10);
  }
  static formatDate(date: string | number | Date) {
    var fecha = new Date(date);

    return fecha.toISOString().substring(0, 10);
  }
  static formatoFecha(fecha:any) {
    const splitDate = fecha.split('-');
    if (splitDate.count == 0) {
      return null;
    }

    const year = splitDate[0];
    const month = splitDate[1];
    const day = splitDate[2];

    return day + '/' + month + '/' + year;
  }
  static nombreMesFecha(fecha:any) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const date = new Date(fecha);
    const fechaNumeroMes = date.getMonth();
    return meses[fechaNumeroMes];

  }
  static nombreDiaFecha(fecha:any) {
    const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    const date = new Date(fecha);
    return dias[date.getDay()];
  }

  static diferenciaHoras(inicio:any, fin:any) {
    const start = inicio.split(':');
    const end = fin.split(':');
    const startDate = new Date(0, 0, 0, start[0], start[1], 0);
    const endDate = new Date(0, 0, 0, end[0], end[1], 0);
    let diff = endDate.getTime() - startDate.getTime();
    const hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diff / 1000 / 60);
    return hours + '.' + (minutes < 9 ? '0' : '') + minutes;
  }

  static guardarValoresLocales(clave: any, valor : any) {
    localStorage.removeItem(clave);
    localStorage.setItem(clave, valor);
  }

  static obtenerValoresLocales(clave: string) {
    return localStorage.getItem(clave);
  }

  static eliminarValoresLocales(clave: string) {
    localStorage.removeItem(clave);
  }

  static mensajeError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }

  static mensajeInformativo(titulo: string, mensaje : string) {
    Swal.fire({
      icon: 'info',
      title: titulo,
      text: mensaje,
      timer: 1500,
      showCancelButton: false,
      showConfirmButton: false
    });
  }

  static obtenerUsuario(loginStorageService: LoginStorageService) {
    const usuarioModel: UsuarioModel = loginStorageService.getCurrentUser();
    if (usuarioModel != null) {
      return usuarioModel.nomPer;
    }
    else {
      return null;
    }
  }


}
