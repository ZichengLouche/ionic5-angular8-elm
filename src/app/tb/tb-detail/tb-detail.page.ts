import { Component, ViewChild, ElementRef, ComponentRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { IonContent, IonSegment, IonToolbar } from '@ionic/angular';
import { TBService } from '../../service';
import { ImgBaseUrl } from '../../config/env';

@Component({
  selector: 'app-tb-detail',
  templateUrl: 'tb-detail.page.html',
  styleUrls: ['tb-detail.page.scss']
})
export class TBDetailPage implements AfterViewInit, AfterViewChecked {
  imgBaseUrl: string = ImgBaseUrl;
  productDetail: any = {};
  private _segmentValue = "#tb-features";
  set segmentValue(value: string) {
    this._segmentValue = value;
    this.contentAnchors = this.generateContentAnchors();
    console.log("set segmentValue -> generateContentAnchors -> ", JSON.stringify(this.contentAnchors));
  }
  get segmentValue(): string {
    return this._segmentValue;
  }

  @ViewChild(IonContent, { static: false }) content: IonContent;
  @ViewChild('fixedToolbarContainer', { static: false }) fixedToolbarContainer: ElementRef;
  @ViewChild('dynamicNavBarContainer', { static: false }) dynamicNavBarContainer: ElementRef;
  @ViewChild('segmentNavBar', { static: false }) segmentNavBarComponent: ComponentRef<IonSegment>;
  @ViewChild('segmentNavBar', { static: false }) segmentNavBarElement: ElementRef;
  @ViewChild('segmentNavBar', { static: false }) segmentNavBar: IonSegment;
  segmentNavBarNative: HTMLElement;
  fixedToolbarContainerNative: HTMLElement;
  isFixedNavBar: boolean;
  segmentNavBarTop: number;
  contentAnchors: any;
  timerId: number;

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

        setTimeout(() => {
          this.segmentNavBarTop = this.segmentNavBarNative.offsetTop;
          this.contentAnchors = this.generateContentAnchors();
          console.log("ngOnInit -> tbService.getProductDetail().subscribe -> setTimeout-200 -> boundingTop:" + this.segmentNavBarNative.getBoundingClientRect().top, "offsetTop:" + this.segmentNavBarNative.offsetTop);
        }, 500);

      },
      error => console.log(error)
    );
  }

  ngAfterViewInit() {
    this.segmentNavBarNative = document.getElementById("segment-nav-bar");
    this.fixedToolbarContainerNative = document.getElementById("fixed-nav-bar-container");

    this.content.ionScroll.subscribe(($event) => {
      console.log(`ngAfterViewInit -> content.ionScroll.subscribe -> boundingTop: ${this.segmentNavBarNative.getBoundingClientRect().top} 
                   offsetTop: ${ this.segmentNavBarNative.offsetTop} ionScroll.$event.detail.scrollTop: ${$event.detail.scrollTop} OriginOffsetTop: ${this.segmentNavBarTop}`);

      // console.log("ngAfterViewInit -> content.ionScroll.subscribe -> generateContentAnchors -> ", JSON.stringify(this.generateContentAnchors()));
      this.toggleFixedNavBar($event);
      this.scrollActived($event);
    });
  }

  ngAfterViewChecked() {
    console.log("ngAfterViewChecked");
  }

  toggleFixedNavBar($event) {
    if ($event.detail.scrollTop >= this.segmentNavBarTop - 3) {
      if (!this.isFixedNavBar) {
        this.fixedToolbarContainerNative.appendChild(this.segmentNavBarNative);
      }
      this.isFixedNavBar = true;

    } else {
      if (this.isFixedNavBar) {
        this.dynamicNavBarContainer.nativeElement.appendChild(this.segmentNavBarNative);
      }
      this.isFixedNavBar = false;
    }
  }

  scrollActived($event) {
    if ($event.detail.scrollTop < this.contentAnchors.tourItinerary) {
      this.segmentValue = "#tb-features";

    } else if ($event.detail.scrollTop >= this.contentAnchors.tourItinerary && $event.detail.scrollTop < this.contentAnchors.feeDescription) {
      this.segmentValue = "#tour-itinerary";

    } else if ($event.detail.scrollTop >= this.contentAnchors.feeDescription && $event.detail.scrollTop < this.contentAnchors.bookingInformation) {
      this.segmentValue = "#fee-description";

    } else {
      this.segmentValue = "#booking-information";
    }

    this.segmentNavBarNative.scrollLeft = ($event.detail.scrollTop < this.contentAnchors.bookingInformation) ? 0 : this.segmentNavBarNative.scrollWidth;
  }

  generateContentAnchors() {
    let tbFeaturesNative = document.getElementById('tb-features');
    let tourItineraryNative = document.getElementById('tour-itinerary');
    let feeDescriptionNative = document.getElementById('fee-description');
    let bookingInformationNative = document.getElementById('booking-information');

    return {
      "tbFeatures": tbFeaturesNative.offsetTop,
      "tourItinerary": tourItineraryNative.offsetTop,
      "feeDescription": feeDescriptionNative.offsetTop,
      "bookingInformation": bookingInformationNative.offsetTop,
    }
  }

  // Andy 2020.3.18 17:42
  segmentChanged(ev: any) {
    if (window.location.hash) {
      window.location.href = window.location.href.replace(/#.*/, this.segmentValue);
    } else {
      window.location.href = window.location.href + this.segmentValue;
    }
  }

  segmentNavigateByScroll(type: string) {
    let contentScrollY = this.contentAnchors[this.segmentValue] ? this.contentAnchors[this.segmentValue] : 0;
    const needScrollNavBarTypes = ['theme', 'saleTool'];
    this.segmentNavBarNative.scrollLeft = needScrollNavBarTypes.indexOf(type) >= 0 ? this.segmentNavBarNative.scrollWidth : 0;
    this.content.scrollToPoint(0, contentScrollY, 500);
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
