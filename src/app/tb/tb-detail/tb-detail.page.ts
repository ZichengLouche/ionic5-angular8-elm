import { Component, ViewChild, ElementRef, ComponentRef, AfterViewInit, AfterViewChecked, Renderer } from '@angular/core';
import { IonContent, IonSegment, IonToolbar } from '@ionic/angular';
import { TBService } from '../../service';
import { ImgBaseUrl } from '../../config/env';
import { CommonUtils } from '../../utils/common-utils';

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

  constructor(private tbService: TBService, private elementRef: ElementRef, private renderer: Renderer) {
    this.imgBaseUrl = "test";
    this.scrollHandler = CommonUtils.throttle(this.scrollHandler, 200);
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
          CommonUtils.symbolIterator(this.productDetail.feeDescription);
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
      console.log(`content.ionScroll.subscribe -> boundingTop: ${this.segmentNavBarNative.getBoundingClientRect().top} 
                   offsetTop: ${ this.segmentNavBarNative.offsetTop} ionScroll.$event.detail.scrollTop: ${$event.detail.scrollTop} OriginOffsetTop: ${this.segmentNavBarTop}`);

      // console.log("ngAfterViewInit -> content.ionScroll.subscribe -> generateContentAnchors -> ", JSON.stringify(this.generateContentAnchors()));
      // this.toggleFixedNavBar($event);
      // this.scrollActived($event);
      // this.isSticky($event);

      this.scrollHandler($event);
    });

    this.content.ionScrollEnd.subscribe(($event) => {
      console.log("ionScrollEnd:", $event);
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

  scrollHandler($event) {
    this.scrollActived($event);
    this.isSticky($event);
  }

  isSticky($event) {
    if ($event.detail.scrollTop >= this.segmentNavBarTop) {
      this.isFixedNavBar = true;

    } else {
      this.isFixedNavBar = false;
    }
  }

  scrollActived($event) {
    if ($event.detail.scrollTop < this.contentAnchors["#tour-itinerary"]) {
      this.segmentValue = "#tb-features";

    } else if ($event.detail.scrollTop >= this.contentAnchors["#tour-itinerary"] && $event.detail.scrollTop < this.contentAnchors["#fee-description"]) {
      this.segmentValue = "#tour-itinerary";

    } else if ($event.detail.scrollTop >= this.contentAnchors["#fee-description"] && $event.detail.scrollTop < this.contentAnchors["#booking-information"]) {
      this.segmentValue = "#fee-description";

    } else {
      this.segmentValue = "#booking-information";
    }
    console.log(`scrollActived -> set this.segmentValue = ${this.segmentValue}`);

    this.segmentNavBarNative.scrollLeft = ($event.detail.scrollTop < this.contentAnchors.bookingInformation) ? 0 : this.segmentNavBarNative.scrollWidth;
  }

  generateContentAnchors() {
    let tbFeaturesNative = document.getElementById('tb-features');
    let tourItineraryNative = document.getElementById('tour-itinerary');
    let feeDescriptionNative = document.getElementById('fee-description');
    let bookingInformationNative = document.getElementById('booking-information');

    return {
      "#tb-features": tbFeaturesNative.offsetTop - (this.isFixedNavBar ? this.segmentNavBarNative.offsetHeight : 0),
      "#tour-itinerary": tourItineraryNative.offsetTop - (this.isFixedNavBar ? this.segmentNavBarNative.offsetHeight : 0),
      "#fee-description": feeDescriptionNative.offsetTop - (this.isFixedNavBar ? this.segmentNavBarNative.offsetHeight : 0),
      "#booking-information": bookingInformationNative.offsetTop - (this.isFixedNavBar ? this.segmentNavBarNative.offsetHeight : 0),
    }
  }

  // Andy 2020.3.18 17:42
  segmentChanged(ev: any) {
    if (window.location.hash) {
      window.location.href = window.location.href.replace(/#.*/, this.segmentValue);
    } else {
      window.location.href = window.location.href + this.segmentValue;
    }
    console.log("segmentChanged -> window.location.href:", this.segmentValue);
  }

  segmentClicked(value: any) {
    this.segmentValue = value;
    if (window.location.hash) {
      window.location.href = window.location.href.replace(/#.*/, this.segmentValue);
    } else {
      window.location.href = window.location.href + this.segmentValue;
    }
    console.log("segmentClicked -> window.location.href:", this.segmentValue);
  }

  segmentNavigateByScroll(ev: any) {
    let contentScrollY = this.contentAnchors[this.segmentValue] ? this.contentAnchors[this.segmentValue] : 0;
    const needScrollNavBarTypes = ['theme', 'saleTool'];
    this.segmentNavBarNative.scrollLeft = needScrollNavBarTypes.indexOf(this.segmentValue) >= 0 ? this.segmentNavBarNative.scrollWidth : 0;
    this.content.scrollToPoint(0, contentScrollY, 500);
    console.log("segmentNavigateByScroll:", contentScrollY);
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
}
