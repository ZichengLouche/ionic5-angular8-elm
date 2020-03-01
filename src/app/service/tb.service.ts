import { Config } from "../config/config";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient, } from '@angular/common/http';

@Injectable()
export class TBService {
    
    constructor(private http: HttpClient) { }

    getBannerList(): Observable<any> {
        return this.http.get(Config.SERVICES.BANNER_URL).pipe(
            map((res: any) => {
                return res.banners;
            })
        );
    }

    getAnnualProducts(): Observable<any> {
        return this.http.get(Config.SERVICES.ANNUAL_PRODUCTS_URL).pipe(
            map((res: any) => {
                return res.productList;
            })
        );
    }

    getProductDetail(): Observable<any> {
        return this.http.get(Config.SERVICES.PRODUCT_DETAIL_URL).pipe(
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
