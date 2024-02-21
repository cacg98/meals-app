import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { IFavorite } from '../../interfaces/favorite';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { LoaderService } from '../../services/loader/loader.service';

export const favoritesResolver: ResolveFn<IFavorite[]> = (route, state) => {
  inject(LoaderService).showSpinner();
  return inject(FavoritesService).listFavorites();
};
