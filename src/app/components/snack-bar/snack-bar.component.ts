import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarModule, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],

})
export class SnackBarComponent {
  value:string='q';
  // snackBarRef:MatSnackBarRef<any>;
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(massage:string) {

    // this._snackBar.
    console.log(massage);
    this.value=massage;
    // this._snackBar.openFromComponent(SnackBarComponent,  {   ????????????
      this._snackBar.open(massage,'x',  {
      duration: 3 * 1000,
      horizontalPosition: 'center',
      verticalPosition:'top',
    });
  }

  // snackBarRef = @Inject(MatSnackBarRef);

  closeSnackBar(): void {
    this._snackBar.dismiss();
    // this.snackBarRef.dismiss();
  }
}


