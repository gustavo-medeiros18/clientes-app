import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  errors: string[];

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password).subscribe(
      (response) => {
        const accessToken = JSON.stringify(response);

        /**
         * The localStorage.setItem() method is used to store data in the browser's localStorage.
         * It stores the value associated with a specific key.
         * The difference between localStorage and sessionStorage is that data stored in localStorage
         * persists even after the browser is closed, while data in sessionStorage is
         * removed when the browser session ends.
         */
        localStorage.setItem('access_token', accessToken);
        this.router.navigate(['/home']);
      },
      (errorResponse) => {
        console.log(errorResponse);

        this.errors = ['Usuário e/ou senha incorreto(s).'];
      }
    );
  }

  preparaCadastrar(event) {
    event.preventDefault();

    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario = new Usuario();

    usuario.username = this.username;
    usuario.password = this.password;

    this.authService.salvar(usuario).subscribe(
      (response) => {
        this.mensagemSucesso =
          'Cadastro realizado com sucesso! Efetue o login.';
        this.cadastrando = false;
        this.username = this.password = '';
        this.errors = null;
        // this.router.navigate(['/home']);
      },
      (errorResponse) => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
