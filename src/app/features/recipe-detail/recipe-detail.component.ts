import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import {MatIconModule} from '@angular/material/icon';

import { environment } from '../../../environments/environment.development';
import { IRecipe } from '../../common/interfaces/meals-responses';
import { LoaderService } from '../../common/services/loader/loader.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipeDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('details') details!: ElementRef;

  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);

  recipe!: IRecipe;
  showingPlaceholderImg: boolean = true;
  bgImages: { url: string, top: string }[] = [];
  bgImagesUrls: string[] = [
    'assets/images/aguacate.webp',
    'assets/images/ajo.webp',
    'assets/images/berenjena.webp',
    'assets/images/carne.webp',
    'assets/images/cebolla.webp',
    'assets/images/fresa.webp',
    'assets/images/harina.webp',
    'assets/images/huevo.webp',
    'assets/images/pimenton.webp',
    'assets/images/pollo.webp',
    'assets/images/queso.webp',
    'assets/images/tomate.webp',
  ];

  ngOnInit(): void {
    this.route.data.subscribe(
      ({recipe}) => {
        this.recipe = recipe;
        Promise.resolve(null).then(() => this.loaderService.hideSpinner());
      }
    )
  }

  ngAfterViewInit(): void {
    const detailsHeight = this.details.nativeElement.offsetHeight;
    const numberOfImages = Math.floor(detailsHeight / 100);
    let top: number = 0;
    for (let index = 0; index < numberOfImages; index++) {
      const randIndex = this.randomNumber(this.bgImagesUrls.length);
      this.bgImages.push({
        url: this.bgImagesUrls[randIndex],
        top: `${top}px`
      });
      top += 100;
      this.bgImagesUrls.splice(randIndex, 1);
    }
  }

  recipeImg(path: string): string {
    return environment.nestleUrl + path;
  }

  randomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

}
