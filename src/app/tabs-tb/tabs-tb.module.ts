import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';

import { TabsTBPageRoutingModule } from './tabs-tb.router.module';

import { TabsTBPage } from './tabs-tb.page';
import { MsitePageModule } from '../msite/msite.module';
import { SearchPageModule } from '../search/search.module';
import { ProfilePageModule } from '../profile/profile.module';
import { OrderPageModule } from '../order/order.module';

@NgModule({
  imports: [
    SharedModule,
    TabsTBPageRoutingModule,
    // MsitePageModule, SearchPageModule, ProfilePageModule, OrderPageModule 
  ],
  declarations: [TabsTBPage]
})
export class TabsTBPageModule {}
