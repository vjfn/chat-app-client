import { Component, OnInit } from '@angular/core';
import { ChatBoxService } from 'src/app/services/chat-box.service';
import { ChatService } from 'src/app/services/chat.service';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';



@Component({
  selector: 'app-chat-user-list',
  templateUrl: './chat-user-list.component.html',
  styleUrls: ['./chat-user-list.component.scss'],
})
export class ChatUserListComponent implements OnInit {

  public users: any = [];

  public userToAdd: string = '';
  public userSended: boolean = false;

  constructor(
    private chatService: ChatService,
    private chatBoxService: ChatBoxService,
    private storage: Storage,
    private navcontroller: NavController,
    private uiService: UiServiceService
  ) {
    this.addUserListener();
    this.init();
    this.userStatusListener();
  }

  ngOnInit() {
    this.addUserListener();
    this.init();
    this.userStatusListener();
    
  }

  formatLastSeen(lastSeen: string): string {
    const date = new Date(lastSeen);
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString(); 
    return formattedDate + ' ' + formattedTime;
  }

  async init() {
    const savedUsers = await this.storage.get('users');
    if (savedUsers) this.users = savedUsers;
  }

  public addUser() {
    this.chatService.addUser(this.userToAdd);
    this.userSended = true;
  }

  public addUserListener() {
    this.chatService.addUserListener().subscribe(async (data: any) => {
      setTimeout(() => { this.userSended = false }, 1000);
      if (data.error) return this.uiService.alertaInformativa('Usuario no conectado')
      this.users.push(data);
      await this.storage.set('users', this.users);
      return this.uiService.alertaInformativa('Usuario añadido correctamente');
    });
  }

  public userStatusListener() {
    this.chatService.onFriendStatus().subscribe((data: any) => {
      this.users = this.users.map((user: any) => {
        if (user.name === data.name) user.online = data.online;
        return user;
      });
      this.storage.set('users', this.users);
    });
  }


/*   public selectUser(user: any) {
    this.chatBoxService.setFocusedUser(user);
    this.navcontroller.navigateRoot('main/tabs/tab2', { animated: true })
  } */

  public async selectUser(user: any) {
    try {
      await new Promise<void>((resolve) => {
        this.chatBoxService.setFocusedUser(user);
        resolve();
      });
      await this.navcontroller.navigateRoot('main/tabs/tab2', { animated: true });
    } catch (error) {
      console.error('Error setting focused user:', error);
    }
  }
  



  getUserStatusClass(user: any): string {
    return user.online ? 'online' : 'offline';
  }
}
