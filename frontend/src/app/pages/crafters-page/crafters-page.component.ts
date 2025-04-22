import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'crafters-page',
  imports: [NavbarComponent],
  templateUrl: './crafters-page.component.html',
  styleUrl: './crafters-page.component.css',
})
export class CraftersPageComponent { }
