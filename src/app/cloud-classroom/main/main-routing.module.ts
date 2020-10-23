import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '', component: MainPage,
    children: [
      { path: '', redirectTo: '/classroom/home', pathMatch: 'full' },
      { path: 'home', loadChildren: '../cc-home/cc-home.module#CCHomePageModule' },
      { path: 'course', loadChildren: '../course/course.module#CoursePageModule' },
      { path: 'order', loadChildren: '../order/order.module#OrderPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
