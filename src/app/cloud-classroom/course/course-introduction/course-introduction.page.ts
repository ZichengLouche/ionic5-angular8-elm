import { Component, ViewChild, ElementRef, ComponentRef, AfterViewInit, AfterViewChecked, Renderer } from '@angular/core';
import { IonContent, IonSegment, IonToolbar } from '@ionic/angular';
import { CloudClassroomService } from 'src/app/service/cloud-classroom.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-introduction',
  templateUrl: 'course-introduction.page.html',
  styleUrls: ['course-introduction.page.scss']
})
export class CourseIntroductionPage {
  course: any = {};
  segmentValue = "#tb-features";
  courseId: any;

  constructor(private ccService: CloudClassroomService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(
      params => {
        this.courseId = params.get("courseId");
      },
      error => console.log(error)
    );

    this.ccService.getCourseIntroduction().subscribe( 
      data => {
        this.course = data;
      },
      error => console.log(error)
    );
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
