import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '', component: MainPage,
    children: [
      { path: '', redirectTo: '/classroom/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../cc-home/cc-home.module').then( m => m.CCHomePageModule) },
      { path: 'course', loadChildren: () => import('../course/course.module').then( m => m.CoursePageModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
