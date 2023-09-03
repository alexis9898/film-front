import { Category } from './category';
import { Image } from './image';

export class Film{
  constructor(
    public id: any,
    public discription: string,
    public name: string,
    public price: number,
    public author: string,
    public imdb: number,
    public like: number,

    //public categoryId: any,
    public categoriesModel: Category[],

    // public quantity: number, //number of product in cart
    public imagesModel: Image[]
  ) {}
}


