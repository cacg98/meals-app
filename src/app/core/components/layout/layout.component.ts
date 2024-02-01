import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export default class LayoutComponent {
  private router = inject(Router);

  logout() {
    localStorage.removeItem('accessToken');
		localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('login');
  }

}
