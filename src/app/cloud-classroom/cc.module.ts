import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CCHomePage } from './cc-home/cc-home.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      // { path: '', component: CCHomePage },
      { path: '', loadChildren: () => import('./main/main.module').then( m => m.MainPageModule) },
      // { path: ':id', loadChildren: './cc-detail/cc-detail.module#CCDetailPageModule' },
    ])
  ],
  declarations: []
})
export class CCPageModule { }
