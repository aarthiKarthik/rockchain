import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TopPicksComponent } from './top-picks/top-picks.component';
import { OtherCollectionsComponent } from './other-collections/other-collections.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

const homeSwiper: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto',
  initialSlide: 0,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  grabCursor: true,
  normalizeSlideIndex: true,
  a11y: true,
  preventClicks: true
};

@NgModule({
  declarations: [HomeComponent, TopPicksComponent, OtherCollectionsComponent],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [HomeComponent, TopPicksComponent, OtherCollectionsComponent],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: homeSwiper
    }
  ]
})
export class HomeModule { }
