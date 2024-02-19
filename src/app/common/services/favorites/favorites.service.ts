import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as favoritesEndpoints from '../../endpoints/favorites';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private _httpClient = inject(HttpClient);

  isFavorite(anchor: string) {
    return this._httpClient.get<boolean>(favoritesEndpoints.IS_FAVORITE + anchor);
  }

  create(favorite: any) {
    return this._httpClient.post<{}>(favoritesEndpoints.CREATE, favorite);
  }

  delete(anchor: string) {
    return this._httpClient.delete<{}>(favoritesEndpoints.DELETE + anchor);
  }
}
