import { Component } from '@angular/core';
import { RegisterFormBoxComponent } from '../../components/form-box/register/register-form-box.component';
import { BannerComponent } from "../../shared/banner/banner.component";

@Component({
  selector: 'register-page',
  imports: [RegisterFormBoxComponent, BannerComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css',
})
export class RegisterPageComponent { }
