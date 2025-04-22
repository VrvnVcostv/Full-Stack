import { Component } from '@angular/core';
import { SessionService } from '../../services/sessionService';
import { ImageHolderComponent } from "../../components/image-holder/image-holder.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-main-page',
  imports: [NavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  constructor(public sessionService: SessionService){}

}
