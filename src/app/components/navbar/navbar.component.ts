import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  name: string = '';
  user: any = {};

  constructor(
    private router: Router,
    private chatService: ChatService,
    private userService: UsuarioService
  ) {
    this.init();
  }

   async init() {
    this.user = await this.userService.loadUser();
    console.log('hey');
    console.log(this.user);
    if (this.user) this.name = this.user.name;
  }

  public logout() {
    this.userService.logout();
    this.chatService.logout();
    this.router.navigate(['/login']);
  }
}
