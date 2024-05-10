import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/interfaces';
import { ChatService } from 'src/app/services/chat.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  user : Usuario = {};



  constructor(
    private usuarioService:UsuarioService,
    private uiService: UiServiceService,
    private router: Router,
    private chatService: ChatService,
    private userService: UsuarioService

  ) {}

  async ngOnInit() {

    this.user = await this.usuarioService.getUsuario();
    console.log('Iniciando tab 3')
    console.log('Tabs3User', this.user)
    
  }

  async actualizar (fActualizar: NgForm) {

    if(fActualizar.invalid) {return;}

    const actualizado = await this.usuarioService.actualizarUsuario ( this.user)

    if ( actualizado ) {
      //toast con el mensaje de acryalizado
      this.uiService.presentToast('Registro actualizado')
    } else {
      //toast con el error
      this.uiService.presentToast('No se puede actualizar')
    }

  }

  public logout() {
    this.userService.logout();
    this.chatService.logout();
    this.router.navigate(['/login']);
  }
}