import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/interfaces';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  posts: Post[] = [];

  habilitado = true;

  constructor( private postService: PostsService) {}

  ngOnInit() {

    this.siguientes();

    
  }

  recargar(event:any) {

    this.siguientes(event, true);
    this.habilitado= true;
    this.posts =  [];

  }

  siguientes(event?: any, pull: boolean = false) {

    setTimeout(() => { // Agregamos el timeout aquí
      this.postService.getPost(pull)
        .subscribe((resp: any) => {
          console.log(resp);
          this.posts.push(...resp.posts);

          if (event) {
            event.target.complete();

            if (resp.posts.length === 0) {
              this.habilitado = false;
            }
          }
        });
    }, 1500); // 1500 ms de retraso
  }

}
