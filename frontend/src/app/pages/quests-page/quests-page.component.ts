import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'quests-page',
  imports: [NavbarComponent],
  templateUrl: './quests-page.component.html',
  styleUrl: './quests-page.component.css',
})
export class QuestsPageComponent { }
