import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatBoxService } from 'src/app/services/chat-box.service';
import { ChatService } from 'src/app/services/chat.service';


@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent {
  @ViewChild('msgContainer') miElementoRef: ElementRef | undefined;
  public message: string = '';
  public messages: any = {};

  focusedUser: string = '';


  constructor(
    private chatService: ChatService,
    private chatBoxService: ChatBoxService
  ) {
  }

  ngOnInit(): void {
    this.receiveMessage();

    if (this.chatBoxService.currentUser) {
      this.focusedUser = this.chatBoxService.currentUser;
    }

    this.chatBoxService.focusedUser$.subscribe((user: any) => {
      if (user.name === this.focusedUser) return 
      this.focusedUser = user;

      if (!this.messages[user]) this.messages[user] = [];
      
      console.log(this.focusedUser);
    });
  }

  public sendMessage() {
    console.log({
      message: this.message,
      to: this.focusedUser
    });
    this.chatService.sendMessage({ message: this.message, to: this.focusedUser });
    this.messages[this.focusedUser].push({ message: this.message, user: 'me' });
    this.message = '';
    this.scrollToBottom();
  }

  public receiveMessage() {
    this.chatService.receiveMessage().subscribe((data: any) => {
      console.log(data);
      if (!this.messages[data.from]) this.messages[data.from] = [];
      this.messages[data.from].push({ message: data.message, user: data.from });
      this.scrollToBottom();
    });
  }

  scrollToBottom() {
    const elemento: HTMLElement = this.miElementoRef?.nativeElement;
    elemento.scrollTo({ top: elemento.scrollHeight, behavior: 'smooth' });
  }
}
