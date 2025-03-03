import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  imports: [ButtonModule, HeaderComponent, RouterOutlet]
})
export class MainLayoutComponent {
  
}
