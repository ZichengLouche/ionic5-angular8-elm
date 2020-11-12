import { Component, OnInit } from '@angular/core';
import { IonNav, NavParams } from '@ionic/angular';
import { CourseLessonDetailComponent } from '../course-lesson-detail/course-lesson-detail.component';

@Component({
  selector: 'app-course-lesson',
  templateUrl: './course-lesson.component.html',
  styleUrls: ['./course-lesson.component.scss'],
})
export class CourseLessonComponent implements OnInit {
  lesson: any = {};
  nextPage = CourseLessonDetailComponent;

  constructor(private nav: IonNav, private navParams: NavParams) { }

  ngOnInit() {}

  goForward() {
    this.nav.push(this.nextPage, { lesson: this.lesson });
  }

  canGoBack() {
    this.nav.canGoBack().then((res) => {
      console.log(`CourseLessonComponent nav canGoBack -> ${res}`);
    });

    this.nav.getByIndex(0).then((res) => {
      console.log(`CourseLessonComponent nav getByIndex -> ${res}`);
    });
  }

}
