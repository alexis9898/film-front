import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { BehaviorSubject, tap } from 'rxjs';
import { Film } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public allCategory$ = new BehaviorSubject<Category[]>([]);
  public CategoryFilms$=new BehaviorSubject<Film[]>([]);
  public categoriesFilm$ = new BehaviorSubject<Category[]>([]);

  // categoriesFilm:Category[];

  constructor(private http: HttpClient) {}

  getAllCategories(){
    return this.http.get<Category[]>('https://localhost:44318/api/category/')
    .pipe(tap(res=>{
      this.allCategory$.next(res);
    }));
  }

  getCategory(categoryId:number){
    return this.http.get<Category[]>('https://localhost:44318/api/category/'+categoryId);
  }

  getCategoriesFilm(id:number){
    return this.http.get<Category[]>('https://localhost:44318/api/category/categories-by-filmId/'+id);

  }

  addCategory(category:{name:string}){
    return this.http.post<Category[]>('https://localhost:44318/api/category/',category);
  }

  updateCategory(category:{name:string},caegoryId:number){
    return this.http.put<Category>("https://localhost:44318/api/category/"+caegoryId, category)
  }

  deleteCategory(caegoryId:string){
    return this.http.delete<Category>("https://localhost:44318/api/category/"+caegoryId)
  }
}
