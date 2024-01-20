import { Component, ViewChild, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';

import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { activeIndex, ingredients, recipes } from '../../common/signals/meals';

import { SwiperComponent, SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, EffectCards, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCards]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, SwiperModule, IngredientsInputComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  public mealsService = inject(MealsService);

  config: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    cardsEffect: { slideShadows: true }
  };

  ingredientsSignal = ingredients; // referenced to be used in the html
  recipesSignal = recipes; // referenced to be used in the html

  loading: boolean = false;
  firstSearch: boolean = true;

  afterInitSwiper() {
    if (activeIndex() == 0) return;
    setTimeout(() => {
      this.swiper?.swiperRef.slideTo(activeIndex(), 0, false);
    }, 0);
  }

  onSlideChange(e: any) {
    activeIndex.set(e[0].activeIndex);
  }

  search() {
    if (this.firstSearch) this.firstSearch = false;
    this.loading = true;
    this.recipesSignal.set([]);
    this.mealsService.searchByIngredients(this.ingredientsSignal().join(',')).subscribe({
      next: res => {
        console.log(res);
        this.recipesSignal.set(res.filter(recipe => recipe.name));
        this.loading = false;
        activeIndex.set(0);
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }
}
