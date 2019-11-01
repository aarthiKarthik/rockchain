import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PointsService } from '../../services';
import { GetAlbumsService } from '../../services';

@Component({
  selector: 'eybcmp-other-collections',
  templateUrl: './other-collections.component.html',
  styleUrls: ['./other-collections.component.sass']
})
export class OtherCollectionsComponent implements OnInit, OnDestroy {

  other_collections = [];
  _albums = [];
  _points:any;
  _coins:any;
  _btmSeven = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private points: PointsService,
    private albums: GetAlbumsService) { }

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
      this._points = data
      this._coins = this._points.coins.sort(this.dynamicSort('points')).reverse().slice(3, data.length);
      this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        this._albums = data;
        this._btmSeven = this._albums.filter(o1 => this._coins.some((o2: { id: any; }) => o1.id === o2.id));
      })
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
