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
          // { path: 'introduction', loadChildren: './course-introduction/course-introduction.module#CourseIntroductionPageModule' },
          // { path: 'learn', loadChildren: './course-learn/course-learn.module#CourseLearnPageModule' },
          { path: 'introduction', loadChildren: () => import('./course-introduction/course-introduction.module').then( m => m.CourseIntroductionPageModule) },
          { path: 'learn', loadChildren: () => import('./course-learn/course-learn.module').then( m => m.CourseLearnPageModule) },
        ]
      },
    ])
  ],
  declarations: []
})
export class CoursePageModule { }
