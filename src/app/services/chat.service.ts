import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map, Subject } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private observaLogedUser = new Subject<any>();
  logedUser$ = this.observaLogedUser.asObservable();


  constructor(
    private socket: Socket,
    private storage: Storage,
  ) {
    this.onConnect();
    this.onFriendStatus();
  }

  public async onConnect() {
    this.socket.on('connected', async () => {
      console.log('connected');
      const user: Usuario = await this.storage.get('user') || null;
      console.log(user);
      if (user && user.name) this.login(user.name);
    });
  }

  public onFriendStatus() {
    return this.socket.fromEvent('friend-status').pipe(map((data) => data));
  }

  public logout() {
    this.socket.emit('logout');
  }

  public sendMessage(data: { message: string, to: string, file: any }) {
    this.socket.emit('message-to-user', data);
  }

  public receiveMessage() {
    return this.socket.fromEvent('message-to-user').pipe(map((data) => data));
  }

  public listMessages() {
    return this.socket.fromEvent('received').pipe(map((data) => data));

  }

  public login(name: string) {
    this.socket.emit('login', { name });
    this.observaLogedUser.next(name);
  }

  public addUser(user: string) {
    this.socket.emit('add-user', user);
  }

  public addUserListener() {
    return this.socket.fromEvent('user-added').pipe(map((data) => data));
  }
}
