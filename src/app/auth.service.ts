import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = `${environment.apiUrl}/usuarios`;
  tokenUrl: string = environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      /**
       * The btoa function encodes a string in base-64. In this case, it is used to encode
       * the clientId and clientSecret in base-64 format to create the Basic Authentication
       * header. This header is necessary for OAuth2 authentication to securely transmit
       * the client credentials to the authorization server.
       */
      Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    return this.http.post(this.tokenUrl, params.toString(), { headers });
  }
}
