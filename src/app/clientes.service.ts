import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}
  /**
   * An Observable is a data type provided by the RxJS library that represents a
   * stream of data that can be observed over time.
   *
   * It is used here to handle asynchronous operations, such as HTTP requests,
   * allowing the application to react to the data once it is available.
   */
  salvar(cliente: Cliente): Observable<Cliente> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Cliente>(
      'http://localhost:8080/api/clientes',
      cliente,
      { headers }
    );
  }

  getCliente(): Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nome = 'Fulano de Tal';
    cliente.cpf = '888.888.888-88';

    return cliente;
  }

  getClientes(): Cliente[] {
    let cliente = new Cliente();

    cliente.id = 1;
    cliente.nome = 'Fulano';
    cliente.dataCadastro = '16/09/2024';
    cliente.cpf = '12345678900';

    return [cliente];
  }
}
