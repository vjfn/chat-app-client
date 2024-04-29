import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { IonicModule } from '@ionic/angular';
import { PipesModule } from '../pipes/pipes.module';
import { ChatComponent } from './chat/chat.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { FormsModule } from '@angular/forms';
import { ChatUserListComponent } from './chat-user-list/chat-user-list.component';
import { NavbarComponent } from './navbar/navbar.component';





@NgModule({
  declarations: [
    PostComponent,
    PostsComponent,
    ChatComponent,
    ChatBoxComponent,
    ChatUserListComponent,
    NavbarComponent
    
  ],
  imports: [
    CommonModule,
    IonicModule,
    PipesModule,
    FormsModule

  ],
  exports: [
    PostsComponent,
    ChatComponent,
    ChatBoxComponent,
    ChatUserListComponent,
    NavbarComponent    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule { }
