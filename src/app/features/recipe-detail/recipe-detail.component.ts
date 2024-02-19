import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';

import { environment } from '../../../environments/environment.development';
import { IRecipe } from '../../common/interfaces/meals-responses';
import { IFavorite } from '../../common/interfaces/favorite';
import { LoaderService } from '../../common/services/loader/loader.service';
import { FavoritesService } from '../../common/services/favorites/favorites.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RecipeDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('details') details!: ElementRef;

  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);
  private favoritesService = inject(FavoritesService);

  recipe!: IRecipe;
  showingPlaceholderImg: boolean = true;
  bgImages: { url: string; top: string }[] = [];
  bgImagesUrls: string[] = [
    'assets/images/aguacate.webp',
    'assets/images/aji.webp',
    'assets/images/ajo.webp',
    'assets/images/arandano.webp',
    'assets/images/azucar.webp',
    'assets/images/berenjena.webp',
    'assets/images/brocoli.webp',
    'assets/images/calamar.webp',
    'assets/images/camaron.webp',
    'assets/images/cambur.webp',
    'assets/images/cangrejo.webp',
    'assets/images/carne.webp',
    'assets/images/cebolla.webp',
    'assets/images/cereza.webp',
    'assets/images/fresa.webp',
    'assets/images/guisante.webp',
    'assets/images/harina.webp',
    'assets/images/huevo.webp',
    'assets/images/kiwi.webp',
    'assets/images/lechuga.webp',
    'assets/images/limon.webp',
    'assets/images/mango.webp',
    'assets/images/manzana.webp',
    'assets/images/naranja.webp',
    'assets/images/patilla.webp',
    'assets/images/pepino.webp',
    'assets/images/pera.webp',
    'assets/images/pescado.webp',
    'assets/images/pimenton.webp',
    'assets/images/pollo.webp',
    'assets/images/queso.webp',
    'assets/images/rabano.webp',
    'assets/images/repollo.webp',
    'assets/images/sal.webp',
    'assets/images/tomate.webp',
    'assets/images/zanahoria.webp',
  ];
  isFavorite: WritableSignal<boolean> = signal(false);
  loadingFavorite: boolean = true;
  anchor!: string;

  ngOnInit(): void {
    this.route.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
      Promise.resolve(null).then(() => this.loaderService.hideSpinner());
    });
    this.anchor = this.route.snapshot.params['path'];
    this.favoritesService.isFavorite(this.anchor).subscribe({
      next: (res) => {
        this.isFavorite.set(res);
        this.loadingFavorite = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngAfterViewInit(): void {
    const detailsHeight = this.details.nativeElement.offsetHeight;
    const numberOfImages = Math.floor(detailsHeight / 124);
    let top: number = 0;
    for (let index = 0; index < numberOfImages; index++) {
      const randIndex = this.randomNumber(this.bgImagesUrls.length);
      this.bgImages.push({
        url: this.bgImagesUrls[randIndex],
        top: `${top}px`,
      });
      top += 124;
      this.bgImagesUrls.splice(randIndex, 1);
    }
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }

  randomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  changeFavorite(isFavorite: boolean) {
    if (this.loadingFavorite) return;
    this.loadingFavorite = true;
    let observable = this.favoritesService.delete(this.anchor);
    if (isFavorite) {
      const favorite: IFavorite = {
        anchor: this.anchor,
        difficulty: this.recipe.difficulty,
        image: this.recipe.image,
        name: this.recipe.name,
        time: this.recipe.time,
      };
      observable = this.favoritesService.create(favorite);
    }
    observable.subscribe({
      next: (res) => {
        this.isFavorite.set(isFavorite);
        this.loadingFavorite = false;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
