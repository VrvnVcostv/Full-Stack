import { Component } from '@angular/core';
import { RegisterFormBoxComponent } from '../../components/form-box/register/register-form-box.component';

@Component({
  selector: 'register-page',
  imports: [RegisterFormBoxComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent { }
