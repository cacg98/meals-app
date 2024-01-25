import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: boolean = false;

  showSpinner() {
    this.loading = true;
  }

  hideSpinner() {
    this.loading = false;
  }
}
