import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { ChatService } from './chat.service';
import { NavController } from '@ionic/angular';

const url = environment.url

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: any = null;
  user: Usuario = {};

  constructor(
    private http: HttpClient,
    private storage: Storage,
    private chatService: ChatService,
    private navCtrl: NavController
  ) { }

  login(email: string, password: string) {

    const data = { email: email, password: password };

    return new Promise(resolve => {

      this.http.post(`${url}/user/login`, data)
        .subscribe(async (resp: any) => {
          console.log(resp);

          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            await this.saveUser(resp['user']);
            this.chatService.login(resp['user'].name);
            this.storage.set('users', resp['user'].friends)
            resolve(true)
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false)
          }

        })
    });
  }

  registro(usuario: Usuario) {

    return new Promise(resolve => {

      this.http.post(`${url}/user/create`, usuario)
        .subscribe(async (resp: any) => {

          if (resp['ok']) {
            await this.guardarToken(resp['token']);
            await this.saveUser(resp['user']);
            this.chatService.login(resp['user'].name);
            resolve(true)
          } else {
            this.token = null;
            this.storage.clear();
            resolve(false)
          }
        })
    })


  }


  //Estas tres
  async getUsuario() {

    if (!this.user._id) {
      this.validaToken();
    }

    this.user = await this.storage.get('user')

    return this.user
  }

  //Esta tb
  async validaToken(): Promise<boolean> {

    await this.getToken();

    if (!this.token) {
      this.navCtrl.navigateRoot('/login')
      return Promise.resolve(false);
    }

    return new Promise(resolve => {

      const headers = new HttpHeaders({
        'x-token': this.token
      })

      this.http.get(`${url}/user/`, { headers })
        .subscribe((resp: any) => {

          if (resp['ok']) {
            this.user = resp['user']
            resolve(true)

          } else {
            this.navCtrl.navigateRoot('/login')
            resolve(false);
          }

        })

    });
  }
  //y esta
  actualizarUsuario(user: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    console.log(user)

    return new Promise(resolve => {

      this.http.put(`${url}/user/update`, user, { headers })
        .subscribe((resp: any) => {

          console.log(resp)

          if (resp['ok']) {
            this.guardarToken(resp['token']);
            resolve(true);
          } else {
            resolve(false);

          }

        })

    })
  }

  public async getToken() {
    this.token = await this.storage.get('token') || null;
    return this.token;
  }

  async saveUser(user: Usuario) {
    this.user = user;
    await this.storage.set('user', user);
  }

  async loadUser() {
    this.user = await this.storage.get('user') || null;
    return this.user;
  }

  async guardarToken(token: string) {

    this.token = token;
    await this.storage.set('token', token);
  }

  async logout() {
    this.token = null;
    this.user = {};
    this.chatService.logout();
    await this.storage.clear();
  }
}
