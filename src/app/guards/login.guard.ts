import {  CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private usuarioService: UsuarioService,
    private router: Router) { }

  async canActivate() {
    await this.usuarioService.getToken();

    if (this.usuarioService.token) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
