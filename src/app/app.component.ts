import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer;
  @ViewChild('drawer1') drawer1: any;

  title = 'films';

  showSideNav(){
    console.log(this.drawer);
    console.log(this.drawer1);

    this.drawer.toggle();
  }

}
