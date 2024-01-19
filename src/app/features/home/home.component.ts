import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

import {MatButtonModule} from '@angular/material/button';

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
  imports: [MatButtonModule, SwiperModule, IngredientsInputComponent, RouterModule],
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
  firstSearch: boolean = true;

  onSlideChange() {
    console.log('slide change');
  }

  search() {
    if (this.firstSearch) this.firstSearch = false;
    this.loading = true;
    this.recipes = [];
    this.mealsService.searchByIngredients(this.ingredients.join(',')).subscribe({
      next: res => {
        console.log(res);
        this.recipes = res.filter(recipe => recipe.name);
        this.loading = false;
      },
      error: err => {
        console.log(err);
        this.loading = false;
      }
    })
  }
}
