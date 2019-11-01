import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { PointsService } from '../../services';
import { GetAlbumsService } from '../../services';

@Component({
  selector: 'eybcmp-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.sass']
})
export class MusicComponent implements OnInit, OnDestroy {

  _artist: string;
  _artistData: any;
  _points: any;
  _coins: any;
  _newpoints: number;
  destroy$: Subject<boolean> = new Subject<boolean>();

  score_vote = ["10"];
  score_albums = [];
  dropAnimation = false;
  startAnimation = false;

  constructor(
    private _location: Location,
    private points: PointsService,
    private albums: GetAlbumsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this._artist = this.route.snapshot.paramMap.get("artist");
    this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
      this._artistData = data.filter(artist => {
        return artist.artist_id === this._artist;
      });
    })
  }

  animationDone() {
    this.dropAnimation = true;
    setTimeout(() => {
      this.startAnimation = true;
    }, 200);
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.animationDone();
      this.points.patchPoints(this._artistData[0].id, 10).subscribe((data: any[]) => {});

      setTimeout(() => {
        this.points.getPoints().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
          this._points = data
          this._coins = this._points.coins.filter((point: { id: any; }) => {
            return point.id === this._artistData[0].id;
          });
          this._newpoints = this._coins[0].points
        })
      }, 5000);
    }
  }

  goBack() {
    this._location.back();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
