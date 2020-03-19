import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';

const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'address', loadChildren: './address/address.module#AddressPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tabs-tb', loadChildren: './tabs-tb/tabs-tb.module#TabsTBPageModule' },
  { path: 'tb/:id', loadChildren: './tb/tb-detail/tb-detail.module#TBDetailPageModule' },
  { path: 'city/:id', loadChildren: './city/city.module#CityPageModule' },
  { path: 'confirmOrder', loadChildren: './confirm-order/confirm-order.module#ConfirmOrderPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'food', loadChildren: './food/food.module#FoodPageModule' },
  { path: 'order/detail', loadChildren: './order/order-detail/order-detail.module#OrderDetailPageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
  exports: [RouterModule],
  providers: [
    // { provide: APP_BASE_HREF, useValue: '!' },
    // { provide: LocationStrategy, useClass: HashLocationStrategy },
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
  ]
})
export class AppRoutingModule { }
