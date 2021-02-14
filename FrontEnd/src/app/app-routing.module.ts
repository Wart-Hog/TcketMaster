import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './components/event/event.component';
import { HomeComponent } from './components/home/home.component';
import { MusicComponent } from './components/music/music.component';

const routes: Routes = [
  {
    path: "home", component: HomeComponent
  },
  {
    path: "events", component: EventComponent,
    children :[{
      path: 'music', component: MusicComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
