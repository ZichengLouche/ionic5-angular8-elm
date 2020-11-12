import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, NavigationStart } from '@angular/router';
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
    const url: Observable<string> = this.route.url.pipe(
      map(segments => {
        console.log(`ActivatedRoute.url: ${segments} - ${typeof segments} - ${JSON.stringify(segments)}`);
        return segments.join('');
      })
    );
    url.subscribe(
      data => {
        console.log(`ActivatedRoute.url: ${data}`);
      },
      error => console.log(error)
    );

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if(event.url.search(/\/learn/) != -1) {
          this.onlyContent = true;

        } else {
          this.onlyContent = false;
        }

      } else if(event instanceof NavigationStart) {
        console.debug(event);
      }
    });

  }

}
