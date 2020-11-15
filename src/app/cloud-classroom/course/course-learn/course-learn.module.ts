import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared';
import { CourseLearnPage } from './course-learn.page';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';
import { CourseLessonDetailComponent } from './course-lesson-detail/course-lesson-detail.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  imports: [
    SharedModule,
    PdfViewerModule,
    // RouterModule.forChild([{ path: ':courseId/:lessonId', component: CourseLearnPage }])
    RouterModule.forChild([{ path: ':courseId', component: CourseLearnPage }])
  ],
  // declarations: [CourseLearnPage],
  declarations: [CourseLearnPage, CourseLessonComponent, CourseLessonDetailComponent],
  entryComponents: [CourseLessonComponent, CourseLessonDetailComponent]
})
export class CourseLearnPageModule { }

