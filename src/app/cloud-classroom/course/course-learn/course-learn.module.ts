import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CourseLearnPage } from './course-learn.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([{ path: ':courseId/:lessonId', component: CourseLearnPage }])
  ],
  declarations: [CourseLearnPage]
}) 
export class CourseLearnPageModule {}

