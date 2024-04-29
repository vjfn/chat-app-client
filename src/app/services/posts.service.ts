import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const url = environment.url;



@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  constructor(private http: HttpClient) {  }

  getPost( pull: boolean = false ) {

    if ( pull ) {
      this.paginaPosts = 0;
    }

    this.paginaPosts ++;

    return this.http.get(`${url}/posts/?pagina=${this.paginaPosts}`)
  }
}
