import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { PointsService } from '../../services';
import { GetAlbumsService } from '../../services';
@Component({
  selector: 'eybcmp-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {

  _leaderboards:any;
  _albums:any = [];
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
  
  merge = (arr1: { forEach: (arg0: (x: any) => void) => void; }, arr2: { forEach: (arg0: (y: any) => void) => void; }) => {
    const temp = []
    arr1.forEach(x => {
      arr2.forEach(y => {
        if (x.id === y.id) {
          temp.push({ ...x, ...y })
        }
      })
    })
    return temp
  }

  ngOnInit() {
    this.points.getPoints().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this._leaderboards = data;
      this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        this._albums = this.merge(this._leaderboards.coins, data).sort(this.dynamicSort("points")).reverse();
      })
    })
  }

  ngAfterViewInit() {
    setInterval(()=>{
      this.points.getPoints().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        this._leaderboards = data;
        this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
          this._albums = this.merge(this._leaderboards.coins, data).sort(this.dynamicSort("points")).reverse();
        })
      })
    }, 5000)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
