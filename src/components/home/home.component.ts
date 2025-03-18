import { Component } from '@angular/core';
import { DisplayComponent } from "../items/display/display.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [DisplayComponent],
})
export class HomeComponent {

}