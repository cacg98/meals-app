import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';

import { StateService } from '../../../common/services/state/state.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export default class LayoutComponent {
  private router = inject(Router);
  private stateService = inject(StateService);

  get darkTheme() {
    return this.stateService.darkTheme;
  }

  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.router.navigateByUrl('login');
  }

  changeDarkMode() {
    this.darkTheme.update((v) => !v);
    localStorage.setItem('theme', this.darkTheme() ? 'dark' : 'light');
  }
}
