import { Component, HostBinding, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderService } from './common/services/loader/loader.service';
import { RecordsService } from './common/services/records/records.service';
import { StateService } from './common/services/state/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @HostBinding('class') get class() {
    return this.darkTheme() ? 'dark-theme' : '';
  }

  private loaderService = inject(LoaderService);
  private recordsService = inject(RecordsService);
  private stateService = inject(StateService);
  private mediaMatcher = inject(MediaMatcher);

  get darkTheme() {
    return this.stateService.darkTheme;
  }

  title = 'meals-app';

  constructor() {
    const theme = localStorage.getItem('theme');
    if (
      (theme && theme == 'dark') ||
      (!theme &&
        this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      this.darkTheme.set(true);
      document.documentElement.style.setProperty(
        '--swiper-theme-color',
        '#ffc8b7'
      );
    }
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.recordsService.list().subscribe({
        next: (res) => {
          this.stateService.records.set(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  get loading(): boolean {
    return this.loaderService.loading;
  }
}
