import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  errors: String[];

  constructor(private service: ClientesService, private router: Router) {
    this.cliente = service.getCliente();
  }

  ngOnInit(): void {}

  voltarParaListagem() {
    this.router.navigate(['/clientes-lista']);
  }

  onSubmit() {
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
