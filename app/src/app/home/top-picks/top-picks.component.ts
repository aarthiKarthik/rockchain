import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { SwiperComponent, SwiperDirective, SwiperConfigInterface, SwiperScrollbarInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

import { PointsService } from '../../services';
import { GetAlbumsService } from '../../services';

@Component({
  selector: 'eybcmp-top-picks',
  templateUrl: './top-picks.component.html',
  styleUrls: ['./top-picks.component.sass']
})
export class TopPicksComponent implements OnInit, OnDestroy {

  index:number = 0;
  _albums = [];
  _coins: any;
  _points:any;
  _topThree = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  public config: SwiperConfigInterface = {
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

  constructor(
    private points: PointsService,
    private albums: GetAlbumsService) {}

  dynamicSort(property:any) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a:any,b:any) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
  }

  ngOnInit() {
    this.points.getPoints().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this._points = data;
      this._coins = this._points.coins.sort(this.dynamicSort('points')).reverse().slice(0,3);
      this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        this._albums = data;
        this._topThree = this._albums.filter(o1 => this._coins.some((o2: { id: any; }) => o1.id === o2.id));
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
