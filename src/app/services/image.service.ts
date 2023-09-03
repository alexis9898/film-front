import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  UpdateImage(post: any) {
    return this.http.post(
      'https://localhost:44318/api/image/uplaod-image-file',
      post,
      { responseType: 'text' }
    );
  }

  removeImgFile(img: Image) {
    return this.http.get('https://localhost:44318/api/image/delete-image-file/'+img.path);
  }

  removeImg(img: Image) {
    return this.http.delete('https://localhost:44318/api/image/' + img.id);
  }

  PostImage(post: any) {
    return this.http.post('https://localhost:44318/api/image', post);
  }}
