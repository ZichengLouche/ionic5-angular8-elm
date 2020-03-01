import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService, DataService, LocalStorageService, CartService, ShopService, TBService } from '../service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
  ],
  exports: [
  ],
  entryComponents: [],
  providers: [
    AppService,
    DataService,
    LocalStorageService,
    CartService,
    ShopService,
    TBService
  ]
})
export class CoreModule {}
