import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-course-lesson-detail',
  templateUrl: './course-lesson-detail.component.html',
  styleUrls: ['./course-lesson-detail.component.scss'],
})
export class CourseLessonDetailComponent implements OnInit {
  lesson: any = {};
  
  constructor() { }

  ngOnInit() {}

}
