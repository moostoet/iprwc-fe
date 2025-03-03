import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './auth-layout.component.html',
  imports: [ButtonModule, RouterOutlet]
})
export class AuthLayoutComponent {
  
}
