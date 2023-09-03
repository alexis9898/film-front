import { Film } from "./film";


export class Cart{
  constructor(
    public filmId:any,
    public quantity:number,
    public film: Film,
  ){}
}


