import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: 'introduction', loadChildren: './course-introduction/course-introduction.module#CourseIntroductionPageModule' },
          // { path: 'introduction', loadChildren: () => import('./course-introduction/course-introduction.module').then( m => m.CourseIntroductionPageModule) },
          { path: 'learn', loadChildren: './cc-detail/cc-detail.module#CCDetailPageModule' },
        ]
      },
    ])
  ],
  declarations: []
})
export class CoursePageModule { }
