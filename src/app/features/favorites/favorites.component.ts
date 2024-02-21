import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFavorite } from '../../common/interfaces/favorite';
import { LoaderService } from '../../common/services/loader/loader.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export default class FavoritesComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private loaderService = inject(LoaderService);

  favorites: IFavorite[] = [];

  ngOnInit(): void {
    this.route.data.subscribe(({ favorites }) => {
      this.favorites = favorites;
      Promise.resolve(null).then(() => this.loaderService.hideSpinner());
    });
  }
}
