import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TBPage } from './tb-home/tb.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: TBPage },
      { path: ':id', loadChildren: './tb-detail/tb-detail.module#TBDetailPageModule' },
    ])
  ],
  declarations: [TBPage]
})
export class TBPageModule { }
