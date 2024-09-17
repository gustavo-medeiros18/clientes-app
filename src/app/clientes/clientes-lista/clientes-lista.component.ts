import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
})
export class ClientesListaComponent implements OnInit {
  clientes: Cliente[] = [];
  clienteSelecionado: Cliente;

  // The service is used to fetch the list of clients from the backend.
  // The router is used to navigate between different routes in the application.
  constructor(private service: ClientesService, private router: Router) {}

  ngOnInit(): void {
    this.service.getClientes().subscribe((response) => {
      this.clientes = response;
    });
  }

  novoCadastro() {
    // The navigate method is used to programmatically navigate to the 'clientes-form' route.
    this.router.navigate(['/clientes-form']);
  }

  preparaDelecao(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }
}
