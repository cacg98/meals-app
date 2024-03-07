import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  MediaMatcher,
  BreakpointObserver,
  Breakpoints,
} from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';

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
export class AppComponent implements OnInit, OnDestroy {
  @HostBinding('class') get class() {
    return this.darkTheme() ? 'dark-theme' : '';
  }

  private loaderService = inject(LoaderService);
  private recordsService = inject(RecordsService);
  private stateService = inject(StateService);
  private mediaMatcher = inject(MediaMatcher);
  private breakpointObserver = inject(BreakpointObserver);

  get darkTheme() {
    return this.stateService.darkTheme;
  }
  get isMobile() {
    return this.stateService.isMobile;
  }
  get loading() {
    return this.loaderService.loading;
  }

  title = 'meals-app';

  destroyed = new Subject<void>();

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

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (result.matches) {
          this.isMobile.set(true);
        } else {
          this.isMobile.set(false);
        }
      });
  }

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.recordsService.list().subscribe({
        next: (res) => {
          this.stateService.records.set(res.data);
          this.stateService.totalRecords.set(res.count);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
