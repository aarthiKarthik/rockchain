import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as WaveSurfer from 'wavesurfer.js';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { PointsService } from '../../services';
import { GetAlbumsService } from '../../services';

@Component({
  selector: 'eybcmp-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.sass']
})
export class SongComponent implements OnInit {

  _artist: string;
  _artistData: any;
  _song: string;
  _songData: any;
  _points: any;
  _newpoints: number;

  wave: WaveSurfer = null;
  song_currentTime: any = "0:00";
  song_currentTime_interval: any;
  song_duration: any = "0:00";

  status: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  current_songID: any;
  song_prev: any | boolean = true;
  song_next: any | boolean = true;

  score_vote = ['5'];
  score_song = [];
  dropAnimation = false;
  startAnimation = false;

  constructor(
    private points: PointsService,
    private albums: GetAlbumsService,
    private route: ActivatedRoute, 
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private router: Router) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }

    ngOnInit() {
      this.status = false;
      this._artist = this.route.snapshot.paramMap.get("artist");
      this._song = this.route.snapshot.paramMap.get("song");
      // console.log("Arist Param: "+this._artist);
      // console.log("Song Param: "+this._song);

      this.albums.getAlbums().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
        this._artistData = data.filter(artist => {
          return artist.artist_id === this._artist;
        });
        this._songData = this._artistData[0].playlists[0].songs.find((o: { id: string; }) => o.id === this._song);

        // console.log("Arist Data: ");
        // console.log(this._artistData);
        // console.log("Song Data: ");
        // console.log(this._songData);

        // Song WaveSurfer
        this.generateWaveform();
        this.cdr.detectChanges();
        Promise.resolve().then(() => this.wave.load('/assets/audio/'+this._songData.music));

        // Songs (Next/Prev)
        this.current_songID = this.findWithAttr(this._artistData[0].playlists[0].songs, 'id', this._song);
        if(this.current_songID == 0){
          this.song_prev = false;
          this.song_next = this._artistData[0].playlists[0].songs[this.current_songID+1].id
        } else if(this.current_songID == (this._artistData[0].playlists[0].songs.length - 1)) {
          this.song_prev = this._artistData[0].playlists[0].songs[this.current_songID-1].id;
          this.song_next = false
        } else {
          this.song_prev = this._artistData[0].playlists[0].songs[this.current_songID-1].id;
          this.song_next = this._artistData[0].playlists[0].songs[this.current_songID+1].id
        }
      })
    }

    ngOnDestroy() {
      this.destroy$.next(true);
      this.destroy$.unsubscribe();
    }

    formatTime(time: any) {
      return [
          Math.floor((time % 3600) / 60), // minutes
          ('00' + Math.floor(time % 60)).slice(-2) // seconds
      ].join(':');
    };

    findWithAttr(array: { [x: string]: any; }[], attr: string | number, value: any) {
      for(var i = 0; i < array.length; i += 1) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
    }

    generateWaveform(): void {
      Promise.resolve(null).then(() => {
        this.wave = WaveSurfer.create({
          container: '#waveform',
          waveColor: 'rgba(255,255,255,0.45)',
          progressColor: '#FC00CE',
          barGap: 8,
          barWidth: 5,
        });
      });
    }
    
    animationDone() {
      this.dropAnimation = true;
      setTimeout(() => {
        this.startAnimation = true;
      }, 200);
    }

    changeSongPoint(songs:Array<any>, songId: string, newValue: number){
      for(let i in songs){
        if (songs[i].id == songId) {
          songs[i].points = newValue;
          break;
       }
      }
      return console.log(songs);
    }

    onDrop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else {
        transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this.animationDone();
        this.points.patchPoints(this._artistData[0].id, 5).subscribe((data: any[]) => {});

        setTimeout(() => {
          this.points.getPoints().pipe(takeUntil(this.destroy$)).subscribe((data: any[]) => {
            this._points = data.filter(point => {
              return point.id === this._artistData[0].id;
            });
            this._newpoints = this._points[0].points
          })
        }, 5000);
      }
    }

    onPausedPressed(): void {
      this.status = !this.status;
      this.wave.playPause();
      if (this.wave.isPlaying()){
        this.song_currentTime_interval = setInterval(() => this.song_currentTime = this.formatTime(this.wave.getCurrentTime()), 500)
      } else {
        clearInterval(this.song_currentTime_interval);
      }
    }

    goBack() {
      this._location.back();
      this.wave.stop();
    }

    goToPrevSong(){
      this.wave.stop();
      this.router.navigate(['/music', this._artistData[0].artist_id, this.song_prev]);
    }

    goToNextSong(){
      this.wave.stop();
      this.router.navigate(['/music', this._artistData[0].artist_id, this.song_next]);
    }
    
    
}