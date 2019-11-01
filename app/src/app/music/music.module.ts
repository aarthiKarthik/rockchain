import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MusicComponent } from './music/music.component';
import { SongComponent } from './song/song.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [MusicComponent, SongComponent],
  imports: [CommonModule, RouterModule, DragDropModule],
  exports: [MusicComponent, SongComponent, DragDropModule]
})
export class MusicModule { }
