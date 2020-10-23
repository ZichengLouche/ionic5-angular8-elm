import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { CCHomePage } from './cc-home.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: '', component: CCHomePage }])
  ],
  declarations: [CCHomePage]
}) 
export class CCHomePageModule {}

