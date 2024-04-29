import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  public currentUser: string = '';

  private observaFocusedUser = new Subject<any>();
  focusedUser$ = this.observaFocusedUser.asObservable();

  constructor() { }

  public setFocusedUser(user: any) {
    this.currentUser = user;
    this.observaFocusedUser.next(user);
  }
 
}
