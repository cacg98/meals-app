import { Component, inject } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { IPreviewRecipe } from '../../common/interfaces/meals-responses';

import { SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, EffectCards, SwiperOptions } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCards]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SwiperModule, IngredientsInputComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public mealsService = inject(MealsService);

  config: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    cardsEffect: { slideShadows: true }
  };

  ingredients: string[] = [];
  recipes: IPreviewRecipe[] = [];

  loading: boolean = false;

  onSlideChange() {
    console.log('slide change');
  }

  search() {
    this.loading = true;
    this.recipes = [];
    this.mealsService.searchByIngredients(this.ingredients.join(',')).subscribe({
      next: res => {
        console.log(res);
        this.recipes = res;
      },
      error: err => {
        console.log(err);
      },
      complete: () => this.loading = false
    })
  }
}
