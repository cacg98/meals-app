import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { LoaderService } from './common/services/loader/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private loaderService = inject(LoaderService);

  get loading(): boolean {
    return this.loaderService.loading;
  }
}
