import { Config } from "../config/config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient, } from '@angular/common/http';

@Injectable({ providedIn: 'root'})
export class CloudClassroomService {
    
    constructor(private http: HttpClient) { }

    getBannerList(): Observable<any> {
        console.log("CloudClassroomService.getBannerList:" + Config.SERVICES.GET_BANNER_LIST);
        return this.http.get(Config.SERVICES.GET_BANNER_LIST).pipe(
            map((res: any) => {
                return res.banners;
            })
        );
    }

    getCourses(): Observable<any> {
        return this.http.get(Config.SERVICES.GET_COURSES).pipe(
            map((res: any) => {
                return res.courseList;
            })
        );
    }

    getCourseIntroduction(): Observable<any> {
        return this.http.get(Config.SERVICES.GET_COURSE_INTRODUCTION).pipe(
            map((res: any) => {
                return res;
            })
        );
    }

    getUsercases(): Observable<any> {
        return this.http.get(Config.SERVICES.USERCASES_URL).pipe(
            map((res: any) => {
                return res.usercaseList;
            })
        );
    }

    getOurAdvantages(): any {
        return this.http.get(Config.SERVICES.OURS_URL).pipe(
            map((res: any) => {
                return res.advantageList;
            })
        );
    }


    // // Andy 2017.4.11 15:43
    // getMonthDiscountProduct(): Observable<any> {
    //     return this.http.get(Config.SERVICES.MONTH_DISCOUNT_URL).pipe(map(res => {
    //         return res.json();
    //     }));
    // }

}
