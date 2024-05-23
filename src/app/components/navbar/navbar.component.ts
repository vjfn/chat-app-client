import { Component,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IonPopover } from '@ionic/angular';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  @ViewChild('popover')
  popover!: IonPopover;

  name: string = '';
  user: any = {};
  isOpen = false;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private userService: UsuarioService
  ) {
    this.init();
  }

  async presentPopover(ev: any) {
    const popover = await this.popover;
    popover.event = ev;
    await popover.present();
  }

  public async goTo(){
    this.router.navigate(['/main/tabs/tab3']);
    await this.popover.dismiss();

  }


  async init() {
  this.user = await this.userService.loadUser();
  console.log('hey');
  console.log(this.user);
  if (this.user) this.name = this.user.name;
  this.chatService.logedUser$.subscribe((name) => {
    if (name) this.name = name;
  });
}

  public async logout() {
    this.userService.logout();
    this.chatService.logout();
    this.router.navigate(['/login']);
    await this.popover.dismiss();

  }
}
