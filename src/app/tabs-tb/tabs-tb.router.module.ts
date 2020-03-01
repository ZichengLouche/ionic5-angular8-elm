import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsTBPage } from './tabs-tb.page';


const routes: Routes = [
  {
    path: '',
    component: TabsTBPage,
    children: [
      { path: '', redirectTo: '/tabs-tb/tb', pathMatch: 'full' },
      { path: 'tb', loadChildren: '../tb/tb.module#TBPageModule' },
      { path: 'search', loadChildren: '../search/search.module#SearchPageModule' },
      { path: 'order', loadChildren: '../order/order.module#OrderPageModule' },
      { path: 'profile', loadChildren: '../profile/profile.module#ProfilePageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsTBPageRoutingModule {}
