import { Component } from '@angular/core';
import { ChatBoxService } from 'src/app/services/chat-box.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  focusedUserInfo: any = {};
  lastSeenTime: any = 0;

  constructor( private chatBoxService: ChatBoxService) {}

  ngOnInit() {
    this.chatBoxService.focusedUser$.subscribe((user: any) => {
      this.getFocusedUserInfo();
    });
    this.getFocusedUserInfo();
  }

  getFocusedUserInfo() {
    this.chatBoxService.getFocusedUserInfo().then((data: any) => {
      this.focusedUserInfo = data;
      this.calculateLastSeenTime();
    });
  }

  calculateLastSeenTime() {
    if (this.focusedUserInfo && this.focusedUserInfo.lastSeen) {
      const lastSeenDate = new Date(this.focusedUserInfo.lastSeen);
      const currentDate = new Date();
      const timeDifferenceInMinutes = Math.floor((currentDate.getTime() - lastSeenDate.getTime()) / (1000 * 60));
      if (timeDifferenceInMinutes < 60) {
        this.lastSeenTime = timeDifferenceInMinutes + " minutos";
      } else {
        const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
        this.lastSeenTime = timeDifferenceInHours + " horas";
      }
    }
  }

}
