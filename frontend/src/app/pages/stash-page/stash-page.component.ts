import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'stash-page',
  imports: [NavbarComponent],
  templateUrl: './stash-page.component.html',
  styleUrl: './stash-page.component.css',
})
export class StashPageComponent { }
