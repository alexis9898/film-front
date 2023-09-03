import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-slider-demo',
  templateUrl: './slider-demo.component.html',
  styleUrls: ['./slider-demo.component.css']
})
export class SliderDemoComponent implements OnInit {
  slidervalue:number=0;
  myForm: FormGroup;
/**
 *
 */




  disabled = false;
  max = 200;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = true;
  value = this.max;

  @Output() customEvent:EventEmitter<string> =new EventEmitter<string>();;

  constructor(private formBuilder: FormBuilder,private filmService:FilmService) {}
  ngOnInit(){
    this.myForm=this.formBuilder.group({
      slidervalue:0
    });
    this.filmService.films$.subscribe(fims=>{
      this.value=this.max;
    });

    // this.customEvent.emit(this.value+"");

  }

  formatLabel(val: any) {
    console.log(val);
    console.log(this.customEvent);
    this.customEvent.emit(val);
    if (val >= 1000) {
      this.slidervalue = val;
      return val;
    }
    return val;
  }

}
