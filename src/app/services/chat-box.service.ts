import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  public currentUser: string = '';

  private observaFocusedUser = new Subject<any>();
  focusedUser$ = this.observaFocusedUser.asObservable();

  token: any = null;

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private usuarioService: UsuarioService
  ) { }

  public setFocusedUser(user: any) {
    this.currentUser = user;
    this.observaFocusedUser.next(user);
  }
 
  public async getFocusedUserInfo() {
    const users = await this.storage.get('users');
    return users?.find((user: any) => user.name === this.currentUser);
  }

  public async getLastMsgs() {
    if (!this.token) {
     this.token = await this.usuarioService.getToken();
    }

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise(resolve => {
      this.http.post(`${url}/msg`, {
        receiver: this.currentUser
      }, { headers })
        .subscribe((resp: any) => {
          resolve(resp);
      });
    });
  }
}
