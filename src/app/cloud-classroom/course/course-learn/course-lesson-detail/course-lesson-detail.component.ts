import { Component, OnInit, ViewChild } from '@angular/core';
import { IonNav, NavParams, IonInput } from '@ionic/angular';
import { CloudClassroomService } from 'src/app/service/cloud-classroom.service';

@Component({
  selector: 'app-course-lesson-detail',
  templateUrl: './course-lesson-detail.component.html',
  styleUrls: ['./course-lesson-detail.component.scss'],
})
export class CourseLessonDetailComponent implements OnInit {
  lesson: any = {};
  courseHomework: any = {};
  toggleBackButton: () => void = () => { };
  navCanGoBack: boolean = true;
  segmentValue = "lesson-video";
  nextNavPage = CourseLessonDetailComponent;

  @ViewChild("ionInput", { static: false }) ionInput: IonInput;

  page: number = 1;
  totalPages: number;
  isLoaded: boolean = false;

  constructor(private ccService: CloudClassroomService, private nav: IonNav, private navParams: NavParams) { }

  ngOnInit() {
    // let input = document.querySelector("ion-input");
    // this.ionInput.setFocus();
    setTimeout(() => {
      this.ionInput ? this.ionInput.setFocus() : null;
    }, 0);

    this.ccService.getHomework().subscribe(
      data => {
        this.courseHomework = data;
      },
      error => console.log(error)
    );
  }

  ngAfterViewInit(): void {
    setTimeout(this.toggleBackButton, 0);
    setTimeout(this.canGoBack.bind(this), 0);
    // this.canGoBack();
  }

  canGoBack() {
    this.nav.canGoBack().then((res) => {
      this.navCanGoBack = res;
      console.debug(`CourseLessonComponent nav canGoBack -> ${res}`);
    });

    this.nav.getByIndex(0).then((res) => {
      console.debug(`CourseLessonComponent nav getByIndex -> ${res}`);
    });
  }

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;

    setTimeout(() => {
      this.ionInput ? this.ionInput.setFocus() : null;
    }, 0);
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  inputChange() {
    // console.log(this.page);
  }

  goForward(segmentValue) {
    this.nav.push(this.nextNavPage, { lesson: this.lesson, toggleBackButton: this.toggleBackButton, segmentValue: segmentValue });
  }
}
