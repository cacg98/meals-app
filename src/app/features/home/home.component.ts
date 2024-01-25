import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';

import { environment } from '../../../environments/environment.development';
import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { StateService } from '../../common/services/state/state.service';

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

  get ingredients() { return this.stateService.ingredients; }
  get recipes() { return this.stateService.recipes; }
  get activeIndex() { return this.stateService.activeIndex; }

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
    }, 0);
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
        this.recipes.set(res.filter(recipe => recipe.name));
        this.loading = false;
        this.activeIndex.set(0);
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
