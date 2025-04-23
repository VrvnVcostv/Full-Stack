import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
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
