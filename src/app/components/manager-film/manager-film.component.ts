import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Film } from '../../models/film';
import { ErrorStateMatcher } from '@angular/material/core';
import { Category } from 'src/app/models/category';
import { CartService } from '../../services/cart.service';
import { CategoryService } from '../../services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from 'src/app/models/image';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-manager-film',
  templateUrl: './manager-film.component.html',
  styleUrls: ['./manager-film.component.css'],
})
export class ManagerFilmComponent implements OnInit, OnDestroy {
  matcher = new MyErrorStateMatcher();
  id: number;
  filmsForm: FormGroup;
  destroy$ = new Subject<boolean>();
  editMode = false;
  categories: Category[];

  categoryAddChoosen: Category;

  imagesAddServerArr: any = [];
  imagesForShow: any = [];
  removeImagesServerArray: Array<Image> = [];

  foto: any = '';
  film: Film;
  loaded: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private filmService: FilmService,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    // this.route.params.subscribe((params:Params)=>{
    //   this.id=+params['id'];
    //   this.editMode=params['id']!=null;
    // });
    this.film = this.filmService.filmEdit;
    this.editMode = this.film ? true : false;
    this.initForm();
    this.categoryService.getAllCategories().subscribe();
    this.categoryService.allCategory$
      .pipe(takeUntil(this.destroy$))
      .subscribe((cats) => {
        this.categories = cats;
      });
  }

  initForm() {
    let categories = this.film ? this.film.categoriesModel : [];
    // categories = [
    //   { id: 1, name: 'a', FilmsModel: [] },
    //   { id: 2, name: 'a2', FilmsModel: [] },
    //   { id: 3, name: 'a3', FilmsModel: [] },
    // ];
    this.filmsForm = new FormGroup({
      author: new FormControl(this.film ? this.film.author : 'Alex'),
      discription: new FormControl(
        this.film ? this.film.discription : 'the movie discription'
      ),
      name: new FormControl(this.film ? this.film.name : ''),
      price: new FormControl(
        this.film ? this.film.price : (Math.random() * 100 + 50).toFixed(2)
      ),
      imdb: new FormControl(
        this.film ? this.film.imdb : Math.floor(Math.random() * 100) / 10 + 1
      ),
      categoryArray: new FormArray([]),
    });
    const categoryControls = categories.map(
      (category) => new FormControl(category)
    );

    const arrayValuesControl = this.filmsForm.get('categoryArray') as FormArray;
    categoryControls.forEach((control) => arrayValuesControl.push(control));
  }

  get categoryArray(): FormArray {
    return this.filmsForm.get('categoryArray') as FormArray;
  }
  onSubmit() {
    this.loaded = true;
    console.log(this.filmsForm);
    let name, author, discription, price, imdb, categoryArray;
    author = this.filmsForm.controls['author'].value;
    discription = this.filmsForm.controls['discription'].value;
    price = this.filmsForm.controls['price'].value;
    name = this.filmsForm.controls['name'].value;
    imdb = this.filmsForm.controls['imdb'].value;
    categoryArray = this.filmsForm.controls['categoryArray'].value;

    if (this.editMode) this.editFilm();
    else {
      let newFilm: Film = new Film(
        0,
        discription,
        name,
        price,
        author,
        imdb,
        0,
        categoryArray,
        []
      );
      this.addFilm(newFilm);
    }
  }

  addFilm(film: Film) {
    console.log(film);
    this.filmService.addFilm(film).subscribe((film) => {
      let films: Film[] = this.filmService.filmsChange$.getValue();
      films.push(film);
      this.filmService.filmsChange$.next(films);
      this.postPhotos(film);
    });
  }

  postPhotos(res: Film) {
    for (let i = 0; i < this.imagesAddServerArr.length; i++) {
      let formData = new FormData();
      formData.append('mySingleImage', this.imagesAddServerArr[i]);
      this.imageService.UpdateImage(formData).subscribe((path) => {
        const image = { path: path, filmId: res.id };
        this.imageService.PostImage(image).subscribe((response: any) => {
          if (i === this.imagesAddServerArr.length - 1) {
            this.loaded = false;
            // this.router.navigate(['/products/',this.category.id]);
          }
          console.log('done');
        });
      });
    }
    if (this.imagesAddServerArr.length === 0) {
      this.loaded = false;
      // this.router.navigate(['/products/',this.category.id]);
    }
  }

  editFilm() {}

  categoryChoice(cat: Category) {
    this.categoryAddChoosen = cat;
  }

  addCategoryToLIst(): void {
    if (!this.categoryAddChoosen) {
      return;
    }
    let categories = this.filmsForm.get('categoryArray')?.value;
    let cat = categories.find(
      (cat: Category) => cat.id === this.categoryAddChoosen.id
    );
    console.log(cat);
    if (!cat) this.categoryArray.push(new FormControl(this.categoryAddChoosen));
  }
  removImageFromServer(img: Image, index: number) {
    if (this.film) {
      this.film.imagesModel.splice(index, 1);
      this.removeImagesServerArray.push(img);
    }
  }
  removeCategory(index: number): void {
    this.categoryArray.removeAt(index);
  }
  removeImage(index: number) {
    this.imagesForShow.splice(index, 1);
    this.imagesAddServerArr.splice(index, 1);
  }
  AddPhotos(event: any) {
    // console.log(event);
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    this.imagesAddServerArr.push(event.target.files[0]);
    reader.onload = () => {
      // console.log(this.imagesForShow.length);
      let foto = reader.result;
      this.imagesForShow.push(foto);
      // console.log(this.imagesAddServerArr, this.imageService);
      console.log(this.imagesForShow);
    };
  }

  ngOnDestroy() {
    this.destroy$.next(false);
  }
}
