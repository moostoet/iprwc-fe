import { Component } from '@angular/core';
import { DisplayComponent } from "../items/display/display.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [DisplayComponent],
})
export class HomeComponent {
  // any logic or properties for the home page go here
}