import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as favoritesEndpoints from '../../endpoints/favorites';
import * as interfaces from '../../interfaces/favorite';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _httpClient = inject(HttpClient);

  listFavorites() {
    return this._httpClient.get<interfaces.IFavorite[]>(favoritesEndpoints.LIST);
  }

  isFavorite(anchor: string) {
    return this._httpClient.get<boolean>(favoritesEndpoints.IS_FAVORITE + anchor);
  }

  create(favorite: interfaces.IFavorite) {
    return this._httpClient.post<{}>(favoritesEndpoints.CREATE, favorite);
  }

  delete(anchor: string) {
    return this._httpClient.delete<{}>(favoritesEndpoints.DELETE + anchor);
  }
}
