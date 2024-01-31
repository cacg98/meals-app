import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as recordsEndpoints from '../../endpoints/records';
import * as recordsResponses from '../../interfaces/records-responses';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private _httpClient = inject(HttpClient);
  
  list() {
	  return this._httpClient.get<recordsResponses.IRecord[]>(recordsEndpoints.LIST);
  }

  createOrUpdate(ingredients: string[], image: string) {
	  return this._httpClient.post<recordsResponses.IRecord[]>(recordsEndpoints.CREATE_OR_UPDATE, { ingredients, image });
  }
}
