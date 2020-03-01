import { Component } from '@angular/core';
import { TBService } from '../../service/tb.service';

@Component({
  selector: 'app-tb',
  templateUrl: 'tb.page.html',
  styleUrls: ['tb.page.scss']
})
export class TBPage {
  banners: [];
  annualProducts: any[];
  tbProducts: any[];
  usercases: any[];
  ourAdvantages: any[];

  // Andy 2020.1.12 17:05 Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
  };
  

  constructor(private tbService: TBService) { }

  ngOnInit() {
    // Andy 2020.1.14 18:42
    this.tbService.getBannerList().subscribe( 
      data => {
        this.banners = data;
      },
      error => console.log(error)
    );

    this.tbService.getAnnualProducts().subscribe( 
      data => {
        this.annualProducts = data.filter(item => item.productType == 1);
        this.tbProducts = data.filter(item => item.productType == 2);
      },
      error => console.log(error)
    );

    this.tbService.getUsercases().subscribe( 
      data => {
        this.usercases = data;
      },
      error => console.log(error)
    );

    // Andy 2020.1.29 18:15
    this.tbService.getOurAdvantages().subscribe( 
      data => {
        this.ourAdvantages = data;
      },
      error => console.log(error)
    );
  }

  transform(type: number) {
    switch (type) {
			case 1:
				return '传统';
			case 2:
				return '主题';
			case 3:
				return '团建';
			case 4:
				return '旅行';
			default:
				break;
		}
  }

}
