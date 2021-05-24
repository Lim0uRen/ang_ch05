import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

function userNameValidator(control: FormControl): { [s: string]: boolean } {
  if (!control.value.match(/^zime/)) {
    return { invalidUser: true };
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  myForm: FormGroup;
  userName: AbstractControl;
  password: AbstractControl;
  name$: Observable<string>;

  constructor(private fb: FormBuilder) {
    this.myForm = fb.group(
      {
        'userName': ['', Validators.compose([Validators.required,
          userNameValidator, Validators.minLength(7)])],
        'password': ['', Validators.compose([Validators.required,
        Validators.minLength(6)])]
      }
    );
    this.userName = this.myForm.controls['userName'];
    this.password = this.myForm.controls['password'];
    this.name$ = this.userName.valueChanges;
    this.userName.valueChanges.subscribe(val => {
      console.log(val);
    });
  }
  onSubmit(value: any) {
    console.log(value);
  }
}
