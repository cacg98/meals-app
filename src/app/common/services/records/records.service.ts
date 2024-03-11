import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import * as recordsEndpoints from '../../endpoints/records';
import * as recordsResponses from '../../interfaces/records-responses';

@Injectable({
  providedIn: 'root',
})
export class RecordsService {
  private _httpClient = inject(HttpClient);

  list(page: number = 0, size: number = 5) {
    return this._httpClient.get<{
      data: recordsResponses.IRecord[];
      count: number;
    }>(`${recordsEndpoints.LIST}?page=${page}&size=${size}`);
  }

  createOrUpdate(ingredients: string[], image: string) {
    return this._httpClient.post<{}>(recordsEndpoints.CREATE_OR_UPDATE, {
      ingredients,
      image,
    });
  }

  deleteRecords(recordsIds: string[]) {
    return this._httpClient.delete<{}>(`${recordsEndpoints.DELETE}?ids=${recordsIds}`);
  }

  deleteAllUserRecords() {
    return this._httpClient.delete<{}>(recordsEndpoints.DELETE_ALL);
  }
}
