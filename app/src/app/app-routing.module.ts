import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home"
import { LeaderboardComponent } from "./leaderboard"
import { MusicComponent, SongComponent } from "./music"

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  }, {
    path: "leaderboard",
    component: LeaderboardComponent
  }, {
    path: "music/:artist",
    component: MusicComponent
  }, {
    path: "music/:artist/:song",
    component: SongComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
