import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  imports: [ButtonModule, RouterOutlet, HeaderComponent]
})
export class AdminLayoutComponent {
  
}
