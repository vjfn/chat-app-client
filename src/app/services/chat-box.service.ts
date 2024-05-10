import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  public currentUser: string = '';

  private observaFocusedUser = new Subject<any>();
  focusedUser$ = this.observaFocusedUser.asObservable();

  constructor(
    private storage: Storage
  ) { }

  public setFocusedUser(user: any) {
    this.currentUser = user;
    this.observaFocusedUser.next(user);
  }
 
  public async getFocusedUserInfo() {
    const users = await this.storage.get('users');
    return users?.find((user: any) => user.name === this.currentUser);
  }
}
