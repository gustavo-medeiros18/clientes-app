import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.cliente = service.getCliente();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params.id;
      this.service.getClienteById(this.id).subscribe(
        (response) => {
          this.cliente = response;
        },
        (errorResponse) => {
          this.cliente = new Cliente();
        }
      );
    });
  }

  voltarParaListagem() {
    this.router.navigate(['/clientes/lista']);
  }

  onSubmit() {
    if (this.id) {
      this.service.atualizar(this.cliente).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar o cliente.'];
        }
      );
    } else {
      /**
       * The subscribe method is used to execute the Observable returned by the salvar method.
       * It is necessary to call it here to actually send the HTTP POST request and handle the
       * response or any errors that may occur.
       *
       * First callback function is executed when the request is successful. The second callback
       * function is executed when an error occurs.
       */
      this.service.salvar(this.cliente).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;

          this.cliente = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }
}
