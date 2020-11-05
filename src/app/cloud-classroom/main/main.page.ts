import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  onlyContent: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // const id: Observable<string> = this.route.params.pipe(map(p => p.id));
    // const url: Observable<string> = this.route.url.pipe(
    //   map(segments => {
    //     console.log(`ActivatedRoute.url: ${segments} - ${ typeof segments } - ${JSON.stringify(segments)}`);
    //     return segments.join('');
    //   })
    // );
    // url.subscribe(
    //   data => {
    //     console.log(`ActivatedRoute.url: ${data}`);
    //   },
    //   error => console.log(error)
    // );
    console.log("router.routerState.snapshot.url:" + this.router.routerState.snapshot.url);
    if(this.router.routerState.snapshot.url.search(/\/learn/) != -1) {
      this.onlyContent = true;
    }
  }

}
