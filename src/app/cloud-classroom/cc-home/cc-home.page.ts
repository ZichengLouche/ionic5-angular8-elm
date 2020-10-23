import { Component } from '@angular/core';
import { CloudClassroomService } from '../../service/cloud-classroom.service';

@Component({
  selector: 'app-cc-home',
  templateUrl: 'cc-home.page.html',
  styleUrls: ['cc-home.page.scss']
})
export class CCHomePage {
  banners: [];
  courses: any[];

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
  };

  constructor(private ccService: CloudClassroomService) { }

  ngOnInit() {
    this.ccService.getBannerList().subscribe( 
      data => {
        this.banners = data;
      },
      error => console.log(error)
    );

    this.ccService.getCourses().subscribe( 
      data => {
        this.courses = data;
      },
      error => console.log(error)
    );
  }

}
