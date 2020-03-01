import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { TBDetailPage } from './tb-detail.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: TBDetailPage }])
  ],
  declarations: [TBDetailPage]
}) 
export class TBDetailPageModule {}

