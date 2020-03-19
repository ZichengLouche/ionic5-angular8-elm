import { Component } from '@angular/core';
import { TBService } from '../../service';
import { ImgBaseUrl } from '../../config/env';

@Component({
  selector: 'app-tb-detail',
  templateUrl: 'tb-detail.page.html',
  styleUrls: ['tb-detail.page.scss']
})
export class TBDetailPage {
  imgBaseUrl: string = ImgBaseUrl;
  productDetail: any = {};
  segmentValue = "#tb-features";

  // Andy 2020.1.12 17:05 Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000,
    },
    pagination: {
      el: '.swiper-pagination',
      type: "fraction",
      renderFraction: function (currentClass, totalClass) {
        return '<span class="' + currentClass + '"></span>' +
          '/' +
          '<span class="' + totalClass + '"></span>';
      }
      // clickable: true,
      // hideOnClick: true,
    }
  };

  constructor(private tbService: TBService) {
    this.imgBaseUrl = "test";
  }

  ngOnInit() {
    // Andy 2020.2.17 11:31
    this.tbService.getProductDetail().subscribe(
      data => {
        data.productImages = [];
        data.tourItinerary.forEach(tour => {
          let activityImagesOfTheDay = tour.activityItems.reduce((total, current) => {
            return total.concat(current.activityImages);
          }, []);

          data.productImages = data.productImages.concat(activityImagesOfTheDay);
        });
        data.productImages = data.productCoverImages.concat(data.productImages);

        this.productDetail = data;
        if (this.productDetail.feeDescription) {
          this.symbolIterator(this.productDetail.feeDescription);
        }
      },
      error => console.log(error)
    );

  }

  // Andy 2020.3.18 17:42
  segmentChanged(ev: any) {
    if(window.location.hash) {
      window.location.href = window.location.href.replace(/#.*/, this.segmentValue);
    } else {
      window.location.href = window.location.href + this.segmentValue;
    }
  }

  getImgPath(path) {
    let suffix;
    if (!path) {
      return 'http://test.fe.ptdev.cn/elm/elmlogo.jpeg';
    }
    if (path.indexOf('jpeg') !== -1) {
      suffix = '.jpeg';
    } else {
      suffix = '.png';
    }
    const url = '/' + path.substr(0, 1) + '/' + path.substr(1, 2) + '/' + path.substr(3) + suffix;
    return 'https://fuss10.elemecdn.com' + url;
  }

  trackByFn(index, objID) {
    return index;
  }

  symbolIterator(o) {
    o[Symbol.iterator] = function* iterEntries(obj) {
      obj = this;
      let keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        yield [key, obj[key]];
      }
    }
  }
}
