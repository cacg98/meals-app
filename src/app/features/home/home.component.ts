import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../../environments/environment.development';
import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { StateService } from '../../common/services/state/state.service';
import { RecordsService } from '../../common/services/records/records.service';

import { SwiperComponent, SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, EffectCards, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCards]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, SwiperModule, IngredientsInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  private mealsService = inject(MealsService);
  private stateService = inject(StateService);
  private recordsService = inject(RecordsService);

  get ingredients() { return this.stateService.ingredients; }
  get recipes() { return this.stateService.recipes; }
  get activeIndex() { return this.stateService.activeIndex; }
  get records() { return this.stateService.records; }

  config: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    cardsEffect: { slideShadows: true }
  };

  loading: boolean = false;
  firstSearch: boolean = true;
  showingPlaceholderImg: boolean = true;

  afterInitSwiper() {
    if (this.activeIndex() == 0) return;
    setTimeout(() => {
      this.swiper?.swiperRef.slideTo(this.activeIndex(), 0, false);
    });
  }

  onSlideChange(e: any) {
    this.activeIndex.set(e[0].activeIndex);
  }

  search() {
    if (this.firstSearch) this.firstSearch = false;
    this.loading = true;
    this.showingPlaceholderImg = true;
    this.recipes.set([]);
    this.mealsService.searchByIngredients(this.ingredients().join(',')).subscribe({
      next: res => {
        this.recipes.set(res);
        this.loading = false;
        this.activeIndex.set(0);
        if (res.length) {
          this.recordsService.createOrUpdate(this.ingredients(), res[0].image).subscribe({
            next: res => {
              this.records.set(res);
            },
            error: err => {
              console.log(err);
            }
          })
        }
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }
}
