import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'store-page',
  imports: [NavbarComponent],
  templateUrl: './store-page.component.html',
  styleUrl: './store-page.component.css',
})
export class StorePageComponent { }
