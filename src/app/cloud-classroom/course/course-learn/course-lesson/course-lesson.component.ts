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
  toggleBackButton: Function;
  nextNavPage = CourseLessonDetailComponent;

  constructor(private nav: IonNav, private navParams: NavParams) { }

  ngOnInit() {
    // this.toggleBackButton();
  }

  goForward(segmentValue) {
    this.nav.push(this.nextNavPage, { lesson: this.lesson, toggleBackButton: this.toggleBackButton, segmentValue: segmentValue });
  }
}
