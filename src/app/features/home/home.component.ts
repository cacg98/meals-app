import {
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EMPTY, switchMap } from 'rxjs';

import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';

import { environment } from '../../../environments/environment';
import { IngredientsInputComponent } from '../../common/components/ingredients-input/ingredients-input.component';
import { RecipeCardComponent } from '../../common/components/recipe-card/recipe-card.component';
import { DeleteDialogComponent } from '../../common/components/delete-dialog/delete-dialog.component';
import { MealsService } from '../../common/services/meals/meals.service';
import { StateService } from '../../common/services/state/state.service';
import { RecordsService } from '../../common/services/records/records.service';
import { CustomPaginatorIntl } from '../../common/utils/custom-paginator-intl';
import { fadeInOutAnimation } from '../../common/animations/fadeInOut';

import { SwiperComponent, SwiperModule } from 'swiper/angular';

// import Swiper core and required modules
import SwiperCore, {
  Navigation,
  Pagination,
  EffectCards,
  SwiperOptions,
} from 'swiper';

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
    MatIconModule,
    MatCheckboxModule,
    SwiperModule,
    IngredientsInputComponent,
    RecipeCardComponent,
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: CustomPaginatorIntl }],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [fadeInOutAnimation],
})
export default class HomeComponent {
  @ViewChild('swiper', { static: false }) swiper!: SwiperComponent;
  @ViewChild('searchRef') searchRef!: ElementRef;
  @ViewChildren('checkbox') checkboxes!: QueryList<MatCheckbox>;

  private mealsService = inject(MealsService);
  private stateService = inject(StateService);
  private recordsService = inject(RecordsService);
  private dialog = inject(MatDialog);

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
  isEnableSelect: boolean = false;
  recordsIdsSelected: string[] = [];

  afterInitSwiper() {
    if (this.activeIndex() == 0) return;
    setTimeout(() => {
      this.swiper.swiperRef.slideTo(this.activeIndex(), 0, false);
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
      .pipe(
        switchMap((res) => {
          this.recipes.set(res);
          this.loading = false;
          this.activeIndex.set(0);

          if (res.length) {
            return this.recordsService.createOrUpdate(
              this.ingredients(),
              res[0].image
            );
          } else {
            return EMPTY;
          }
        }),
        switchMap(() => {
          return this.recordsService.list(0, this.size());
        })
      )
      .subscribe({
        next: (res) => {
          this.records.set(res.data);
          this.totalRecords.set(res.count);
          this.page.set(0);
        },
        error: (err) => {
          console.log(err);
          this.loading = false;
        },
      });
  }

  searchRecord(ingredients: string[]) {
    this.searchRef.nativeElement.scrollIntoView({ behavior: 'smooth' });
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
        setTimeout(() => {
          this.recordsIdsSelected.forEach((id) => {
            this.checkboxes.find((checkbox) => checkbox.id == id)?.toggle();
          });
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  enableSelect() {
    this.isEnableSelect = !this.isEnableSelect;
    if (!this.isEnableSelect) this.recordsIdsSelected = [];
  }

  selectRecords(recordId: string) {
    const index = this.recordsIdsSelected.findIndex((id) => id == recordId);
    if (index < 0) {
      this.recordsIdsSelected.push(recordId);
    } else {
      this.recordsIdsSelected.splice(index, 1);
    }
  }

  deleteRecords() {
    this.recordsService
      .deleteRecords(this.recordsIdsSelected)
      .pipe(
        switchMap(() => {
          const amountPages = Math.ceil(
            (this.totalRecords() - this.recordsIdsSelected.length) / this.size()
          );
          if (amountPages == 0) {
            this.page.set(0);
          } else if (this.page() > amountPages - 1) {
            this.page.set(amountPages - 1);
          }
          return this.recordsService.list(this.page(), this.size());
        })
      )
      .subscribe({
        next: (res) => {
          this.recordsIdsSelected = [];
          this.isEnableSelect = false;
          this.records.set(res.data);
          this.totalRecords.set(res.count);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteAllRecords() {
    this.recordsService.deleteAllUserRecords().subscribe({
      next: () => {
        this.records.set([]);
        this.totalRecords.set(0);
        this.page.set(0);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { count: this.recordsIdsSelected.length },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      if (this.recordsIdsSelected.length) {
        this.deleteRecords();
      } else {
        this.deleteAllRecords();
      }
    });
  }
}
