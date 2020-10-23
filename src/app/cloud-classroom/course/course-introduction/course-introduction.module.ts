import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CourseIntroductionPage } from './course-introduction.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: ':courseId', component: CourseIntroductionPage }])
  ],
  declarations: [CourseIntroductionPage]
}) 
export class CourseIntroductionPageModule {}

