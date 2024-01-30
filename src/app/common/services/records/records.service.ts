import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as recordsEndpoints from '../../endpoints/records';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private _httpClient = inject(HttpClient);
  
  list() {
	  return this._httpClient.get<any[]>(recordsEndpoints.LIST);
  }

  createOrUpdate(ingredients: string[], image: string) {
	  return this._httpClient.post<any[]>(recordsEndpoints.CREATE_OR_UPDATE, { ingredients, image });
  }
}
