import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private apiUrl = `${environment.apiUrl}/clientes`;

  constructor(private http: HttpClient) {}

  salvar(cliente: Cliente): Observable<Cliente> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.access_token,
    };

    return this.http.post<Cliente>(this.apiUrl, cliente, {
      headers,
    });
  }

  atualizar(cliente: Cliente): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente, {
      headers,
    });
  }

  getCliente(): Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nome = 'Fulano de Tal';
    cliente.cpf = '888.888.888-88';

    return cliente;
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  getClientes(): Observable<Cliente[]> {
    /**
     * O método localStorage.setItem() é usado para armazenar dados no localStorage do navegador.
     * Ele armazena o valor associado a uma chave específica.
     * A diferença entre localStorage e sessionStorage é que os dados armazenados no localStorage persistem mesmo após o fechamento do navegador,
     * enquanto os dados no sessionStorage são removidos quando a sessão do navegador é encerrada.
     */
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);

    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token.access_token,
    };

    return this.http.get<Cliente[]>(this.apiUrl, { headers });
  }

  deletar(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${cliente.id}`);
  }
}
