import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClientesService } from 'src/app/clientes.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
})
export class ClientesFormComponent implements OnInit {
  cliente: Cliente;
  success: boolean = false;
  errors: String[];

  constructor(private service: ClientesService) {
    this.cliente = service.getCliente();
  }

  ngOnInit(): void {}

  onSubmit() {
    /**
     * The subscribe method is used to execute the Observable returned by the salvar method.
     * It is necessary to call it here to actually send the HTTP POST request and handle the
     * response or any errors that may occur.
     */
    this.service.salvar(this.cliente).subscribe((response) => {
      this.success = true;
    });
  }
}
