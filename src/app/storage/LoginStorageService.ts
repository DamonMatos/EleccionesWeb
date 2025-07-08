import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';


@Injectable()
export class LoginStorageService {

    private localStorageService;
    public currentSession: UsuarioModel;

    constructor(private router: Router) {
        this.localStorageService = localStorage;
        this.currentSession = this.loadSessionData();
    }

    setCurrentSession(session: UsuarioModel): void {
        this.currentSession = session;
        this.localStorageService.setItem('currentUser', JSON.stringify(session));
    }

     loadSessionData(): UsuarioModel {
        const sessionStr = this.localStorageService.getItem('currentUser');
        if (sessionStr === null) {  // Si no existe el valor en localStorage
            return {} as UsuarioModel;
        } else {
            try {
                return JSON.parse(sessionStr) as UsuarioModel;  // Intentamos parsear el string a un objeto UsuarioModel
            } catch (error) {
                console.error('Error parsing session data:', error);  // Manejo de errores en caso de que el JSON esté mal formado
                return {} as UsuarioModel;
            }
        }
    }
    

    getCurrentSession(): UsuarioModel {
        return this.currentSession;
    }

    removeCurrentSession(): void {     
        this.localStorageService.removeItem('currentUser');
        this.currentSession == null;  
    }

    getCurrentUser(): UsuarioModel {
        const session: UsuarioModel = this.getCurrentSession();
        return (session);
    }

    isAuthenticated(): boolean {
        return (this.getToken()) ? true : false;
    }

    getToken(): string {
        const session = this.getCurrentSession();
        return session.token;
    }

    logout(): void {
        this.removeCurrentSession();
        this.router.navigate(['/login']);
    }

    tokenExpired(token: string) {
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 10000)) >= expiry;
    }

    setSessionCodigoUnico(session: string): void {
        this.localStorageService.setItem('currentCodigoUnico', session);
    }

    getSessionCodigoUnico(session: string): boolean {
        const sessionStr = this.localStorageService.getItem('currentCodigoUnico');

        if (sessionStr == session) {
            return true;
        }
        else {
            return false;
        }
    }

    removeSessionCodigoUnico(): void {
        this.localStorageService.removeItem('currentCodigoUnico');
    }
}
