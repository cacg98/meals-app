import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { LoaderService } from './common/services/loader/loader.service';
import { RecordsService } from './common/services/records/records.service';
import { StateService } from './common/services/state/state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private loaderService = inject(LoaderService);
  private recordsService = inject(RecordsService);
  private stateService = inject(StateService);

  ngOnInit(): void {
    if (localStorage.getItem('accessToken')) {
      this.recordsService.list().subscribe({
        next: res => {
          this.stateService.records.set(res)
        },
        error: err => {
          console.log(err)
        }
      })
    }
  }

  get loading(): boolean {
    return this.loaderService.loading;
  }
}
