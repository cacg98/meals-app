import { Component } from '@angular/core';

import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

import { SwiperModule } from 'swiper/angular';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';

// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, SwiperModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  onSlideChange() {
    console.log('slide change');
  }
}
