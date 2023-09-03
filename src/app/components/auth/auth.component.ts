import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable, takeUntil, Subject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { IUser, User } from 'src/app/models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  // @ViewChild('passwordSubmit') passwordSubmit:ElementRef<HTMLInputElement>;
  user$: User;
  destroy$ = new Subject();
  hide1 = true;
  hide2 = true;
  isLoginMode = true;
  authForm: FormGroup;
  passwordPass: Boolean;
  currentPass: string;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log('oninit');

    this.initForm();
    this.authForm.controls['passwordCheck'].valueChanges.subscribe((val) => {
      console.log(this.authForm.controls['password'].value)
      console.log(val)
      if (val !== this.authForm.controls['password'].value) {
        this.authForm.controls["passwordCheck"].setErrors({'incorrect': null});
      }
      // else
      //   this.authForm.controls["passwordCheck"].setErrors({'incorrect': true});
    });

    this.authService.user$.subscribe((user) => {
      if (user) this.user$ = user;
    });

    // this.authForm.get('passwordCheck')?.valueChanges.subscribe((value) => {
    //   const password = this.authForm.get('password')?.value;
    //   console.log(this.passwordPass);
    //   if (value === password) {
    //     this.passwordPass = true;
    //     return;
    //   }
    //   this.passwordPass = false;
    // });
  }

  passwordSub = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    const password = this.authForm.get('password')?.value;
    if (value !== password) {
      this.passwordPass = true;
      return;
    }
    this.passwordPass = false;
  };

  samePassword(control: AbstractControl): ValidationErrors | null {
    console.log(this.currentPass);
    // if (!this.authForm) {
    //   return null;
    // }
    // let password = this.authForm.get('password')?.value;
    // if (password === control.value) return { passwordRequirements: true };

    return null;
  }

  samePassword2() {
    // ?????????
    // if(!this.authForm)
    //   return null;
    return (control: AbstractControl): ValidationErrors | null => {
      // let password;
      // if (this.authForm) {
      //   password = this.authForm.get('password')?.value;
      // }
      // const passwordCheck = control.value;
      // // const password=this.authForm.value.password;
      // // const passwordCheck=this.authForm.value.password;
      // if (password === passwordCheck)
      //   return { samePassword: { value: control.value } };

      return null;
    };
  }

  initForm() {
    this.authForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordCheck: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.authForm);
    const password = this.authForm.get('password')?.value;
    const passwordCheck = this.authForm.get('passwordCheck')?.value;
    // const password=this.authForm.value.password;
    // const passwordCheck=this.authForm.value.password;
    if (password !== passwordCheck && !this.isLoginMode) {
      console.log('password not much');
      return;
    }
    let authObs: Observable<any>;
    if (this.isLoginMode) {
      authObs = this.authService.getManager(
        this.authForm.value.name,
        this.authForm.value.password
      );
    } else {
      authObs = this.authService.addManager(
        this.authForm.value.name,
        this.authForm.value.password
      );
    }
    console.log('why');
    authObs.pipe(takeUntil(this.destroy$)).subscribe(
      (res) => {
        console.log(res);
        // this.router.navigateByUrl('/management-add-product');
      },
      (err) => {
        // this.errMassage = err;
        console.log(err.error);
        //
      }
    );

    //console.log(form.value.name);
  }
  getErrorMessageName() {
    return this.authForm.controls['name'].hasError('required')
      ? 'you must enter value'
      : '';
  }
  getErrorMessagePaswordd() {
    return this.authForm.controls['password'].hasError('required')
      ? 'you must enter value'
      : '';
  }
  getErrorMessagePasswordCheck() {
    // return 'aaaaaaaaaaa';
    if (this.authForm.controls['passwordCheck'].hasError('required'))
      return 'you must enter value';

    // console.log(this.passwordPass);
    return 'password no the same!';
    if (!this.passwordPass) {
    }

    return this.authForm.controls['passwordCheck'].hasError(
      'customPasswordValidator'
    )
      ? 'password not much'
      : ''; //???????????
  }

  ngOnDestroy(): void {
    this.destroy$.next(false);
    // this.passwordSubmit.nativeElement.removeEventListener('change',this.passwordSub);
  }
}
