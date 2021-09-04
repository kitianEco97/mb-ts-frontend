import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = `${environment.URL_AUTH}`;

  constructor(
    private httpClient: HttpClient
  ) { }

  public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
    return this.httpClient.post<any>(`${this.authUrl}nuevo`, nuevoUsuario);
  }

  public login(loginUsuario: LoginUsuario): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(`${this.authUrl}login`, loginUsuario);
  }

  public refresh(dto: JwtDTO): Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(`${this.authUrl}refresh`, dto);
  }
}
