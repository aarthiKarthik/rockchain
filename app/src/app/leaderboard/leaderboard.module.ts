import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

@NgModule({
  declarations: [LeaderboardComponent],
  imports: [CommonModule, RouterModule],
  exports: [LeaderboardComponent]
})
export class LeaderboardModule { }
