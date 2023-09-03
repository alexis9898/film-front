import { Film } from "./film";

export class Category{
  constructor(
    public id: any,
    public name: string,
    //public parentId: any,
    //public children: Category[],
    public FilmsModel:Film[],

  ){}
}


