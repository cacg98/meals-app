import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { environment } from '../../../environments/environment';
import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { StateService } from '../../common/services/state/state.service';
import { RecordsService } from '../../common/services/records/records.service';

import { SwiperComponent, SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCards,
  SwiperOptions,
} from 'swiper';
import { RecipeCardComponent } from '../../common/components/recipe-card/recipe-card.component';
import { CustomPaginatorIntl } from '../../common/utils/custom-paginator-intl';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, EffectCards]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatRippleModule,
    MatPaginatorModule,
    SwiperModule,
    IngredientsInputComponent,
    RecipeCardComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export default class HomeComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  private mealsService = inject(MealsService);
  private stateService = inject(StateService);
  private recordsService = inject(RecordsService);

  get ingredients() {
    return this.stateService.ingredients;
  }
  get recipes() {
    return this.stateService.recipes;
  }
  get activeIndex() {
    return this.stateService.activeIndex;
  }
  get records() {
    return this.stateService.records;
  }
  get darkTheme() {
    return this.stateService.darkTheme();
  }
  get isMobile() {
    return this.stateService.isMobile();
  }
  get page() {
    return this.stateService.recordsPage;
  }
  get size() {
    return this.stateService.recordsSize;
  }
  get totalRecords() {
    return this.stateService.totalRecords;
  }

  config: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    cardsEffect: { slideShadows: true },
  };

  loading: boolean = false;
  firstSearch: boolean = true;

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
    this.recipes.set([]);
    this.mealsService
      .searchByIngredients(this.ingredients().join(','))
      .subscribe({
        next: (res) => {
          this.recipes.set(res);
          this.loading = false;
          this.activeIndex.set(0);
          if (res.length) {
            // TODO separar listado del createOrUpdate
            this.recordsService
              .createOrUpdate(this.ingredients(), res[0].image, this.size())
              .subscribe({
                next: (res) => {
                  this.records.set(res.data);
                  this.totalRecords.set(res.count);
                  this.page.set(0);
                },
                error: (err) => {
                  console.log(err);
                },
              });
          }
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  searchRecord(ingredients: string[]) {
    // TODO al hacer click scrollear al principio
    this.ingredients.set(ingredients);
    this.search();
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }

  paginatorChange(e: PageEvent) {
    this.page.set(e.pageIndex);
    this.size.set(e.pageSize);
    this.recordsService.list(this.page(), this.size()).subscribe({
      next: (res) => {
        this.records.set(res.data);
        this.totalRecords.set(res.count);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
