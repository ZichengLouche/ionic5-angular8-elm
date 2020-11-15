import { Component, ViewChild, ElementRef, ComponentRef, AfterViewInit, AfterViewChecked, Renderer } from '@angular/core';
import { IonContent, IonSegment, IonToolbar, IonNav, NavParams } from '@ionic/angular';
import { CloudClassroomService } from 'src/app/service/cloud-classroom.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { CourseLessonComponent } from './course-lesson/course-lesson.component';

@Component({
  selector: 'app-course-learn',
  templateUrl: 'course-learn.page.html',
  styleUrls: ['course-learn.page.scss']
})
export class CourseLearnPage {
  course: any = {};
  selectedItem: any = {};
  segmentValue = "directory-list";
  showSidebar: boolean = true;
  @ViewChild("ionSubNav", {static: true}) nav: IonNav;
  rootPage = CourseLessonComponent;
  courseId: any;
  lessonId: any;
  showBackButton: boolean = true;

  constructor(private ccService: CloudClassroomService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // const courseId: Observable<string> = this.route.params.pipe(
    //   map(p => {
    //     console.log(`ActivatedRoute.params: ${p} - ${JSON.stringify(p)}`);
    //     return p.courseId;
    //   })
    // );
    // courseId.subscribe(
    //   data => {
    //     console.log(`ActivatedRoute.params courseId: ${data}`);
    //   },
    //   error => console.log(error)
    // );

    // const lessonId: Observable<string> = this.route.paramMap.pipe(
    //   map(p => {
    //     console.log(`ActivatedRoute.paramMap: ${p} - ${JSON.stringify(p)}`);
    //     return p.get("lessonId")
    //   })
    // );
    // lessonId.subscribe(
    //   data => {
    //     console.log(`ActivatedRoute.paramMap lessonId: ${data}`);
    //   },
    //   error => console.log(error)
    // );

    // const paramMap: Observable<ParamMap> = this.route.paramMap;
    // paramMap.subscribe(
    //   data => {
    //     console.log(`ActivatedRoute.paramMap: ${data} - ${JSON.stringify(data)}`);
    //   },
    //   error => console.log(error)
    // );

    // const url: Observable<string> = this.route.url.pipe(
    //   map(segments => {
    //     console.log(`ActivatedRoute.url: ${segments} - ${ typeof segments } - ${JSON.stringify(segments)}`);
    //     return segments.join('/');
    //   })
    // );
    // url.subscribe(
    //   data => {
    //     console.log(`ActivatedRoute.url: ${data}`);
    //   },
    //   error => console.log(error)
    // );

    // console.log("router.routerState.snapshot.url:" + this.router.routerState.snapshot.url);
    // console.log(this.route.params);

    this.route.paramMap.subscribe(
      params => {
        this.courseId = params.get("courseId");
        // this.lessonId = params.get("lessonId");
      },
      error => console.log(error)
    );

    this.ccService.getCourseLearn().subscribe(
      data => {
        setTimeout(() => {
          this.course = data;
          this.selectedItem = this.course.courseChapters[0].lessons[0];
          this.nav.setRoot(this.rootPage, { lesson: this.selectedItem, toggleBackButton: this.toggleBackButton }); 
        }, 100);
      },
      error => console.log(error)
    );
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  toggleBackButton = () => {
    this.showBackButton = !this.showBackButton;
    console.log(`toggleBackButton:${JSON.stringify(this.segmentValue)}`);
  }

  segmentNavigateByScroll(value: any) {
  }

  segmentChanged(ev: any) {
    if (window.location.hash) {
      window.location.href = window.location.href.replace(/#.*/, this.segmentValue);
    } else {
      window.location.href = window.location.href + this.segmentValue;
    }
    console.log("segmentChanged -> window.location.href:", this.segmentValue);
  }

}
